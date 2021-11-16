import * as fs from 'fs';
import * as path from 'path';
import { configShape, exportGroupRegexp, exportRegexp, importedFileShape, importStatementRegexp } from './constants';
import { Logger } from './Logger';

const compressor = require('node-minify')

export default function buildFile(config: configShape, dependencies: importedFileShape[]) {
  let logger = new Logger(config.verbose)
  let finalFile = ''

  dependencies.forEach((depedency) => {
    let processedFile = fs.readFileSync(depedency.path, {encoding: 'utf-8'})

    processedFile = processedFile.split(importStatementRegexp).join('')

    if(depedency.type !== '*') {
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
        let ${depedency.type} = (function () {
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
    output: config.out
  }).catch((err: any) => {
    logger.error(`failed to minify, error in code\n${err}`)
    fs.writeFileSync(config.out, finalFile)
  })

  logger.debug('minified and optimized...')
}