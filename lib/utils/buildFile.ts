import * as fs from 'fs';
import * as path from 'path';
import { configShape, exportGroupRegexp, exportRegexp, hash, importedFileShape, importES6Regexp, importRequireGroupRegexp } from './constants';
import { generatePath } from './getDependencies';
import { Logger } from './Logger';

const compressor = require('node-minify')

export default function buildFile(config: configShape, dependencies: importedFileShape[]) {
  let logger = new Logger(config.verbose)
  let finalFile = `
    function require(file) {
      let files = {
        ${
          (()=>{
            let output = ''

            dependencies.forEach((depedency) => {
              if(depedency.type === 'commonjs') {
                let processedFile = fs.readFileSync(depedency.path, {encoding: 'utf-8'})

                output += `"${hash(depedency.path)}": (()=> {
                  let module = {exports:"invalid"}
                  ${processedFile}
                  return module.exports
                })()`
              }
            })

            return output
          })()
        }
      }
      return files[file]
    }
  `

  dependencies.forEach((depedency) => {
    if(depedency.type === 'commonjs')
      return

    let varType = depedency.varType? depedency.varType : 'let'

    let processedFile = fs.readFileSync(depedency.path, {encoding: 'utf-8'})

    processedFile = processedFile.replace(importES6Regexp, '')

    processedFile = processedFile.replace(importRequireGroupRegexp, (match, variable, name, path)=> {
      return `${variable} ${name} = require("${hash(generatePath(depedency.path, path))}")`
    })

    if(depedency.type === 'es6' && depedency.name !== '*') {
      let exportStatements = Array.from(processedFile.matchAll(exportGroupRegexp))

      let returnStatement = '{'

      exportStatements.forEach((exportStatement) => {
        if(exportStatement[1] === 'function') {
          returnStatement += exportStatement[2].replace('()', '')
        } else {
          returnStatement += exportStatement[2]
        }

        returnStatement += ', '
      })

      returnStatement += '}'

      processedFile = `
        ${varType} ${depedency.name} = (function () {
          ${processedFile.replace(exportRegexp, '')}

          return ${returnStatement}
        })()`
    }

    finalFile += processedFile + '\n'
  })

  fs.mkdirSync(path.dirname(config.out), { recursive: true })

  fs.writeFileSync(config.out, finalFile)

  logger.debug('done compiling, optimizing...')

  compressor.minify({
    compressor: 'gcc',
    input: config.out,
    output: config.out,
    options: {
      compilationLevel: config.compilationLevel
    }
  }).catch((err: any) => {
    logger.error(`failed to minify, error in code\n${err}`)
    fs.writeFileSync(config.out, finalFile)
  })

  logger.debug('minified and optimized...')
}