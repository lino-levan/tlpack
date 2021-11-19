import * as fs from 'fs';
import { Logger } from './Logger';
import * as path from 'path';
import { configShape, importedFileShape, importES6GroupRegexp, importRequireGroupRegexp, varType } from './constants';

export function generatePath(from: string, name: string) {
  let finalPath = path.join(path.resolve(path.dirname(from)), name)
  
  if(!fs.existsSync(finalPath)) {
    if(fs.existsSync(finalPath+'.js')) {
      finalPath += '.js'
    } else if(fs.existsSync(finalPath+'.ts')) {
      finalPath += '.ts'
    }
  }

  return finalPath
}

export default function getDependencies(config: configShape, importedFile: importedFileShape): importedFileShape[] {
  let logger = new Logger(config.verbose)

  if(fs.existsSync(importedFile.path)) {
    let file = fs.readFileSync(importedFile.path, {encoding: 'utf-8'})

    let es6ImportStatements = Array.from(file.matchAll(importES6GroupRegexp))
    let requireImportStatements = Array.from(file.matchAll(importRequireGroupRegexp))

    let imports: importedFileShape[] = []
    
    if (es6ImportStatements !== null) {
      imports = es6ImportStatements.map(regexpMatch => {
        try {
          return { type: "es6", name: regexpMatch[1], path: generatePath(importedFile.path, regexpMatch[2])}
        }
        catch(err) {
          logger.error(`could not resolve es6 import for "${regexpMatch}"`)
        }

        return { type: "es6", name: regexpMatch[1], path: "broken/path"}
      })
    }

    if (requireImportStatements !== null) {
      imports = [
        ...imports,
        ...(
          requireImportStatements.map(regexpMatch => {
            try {
              return { type: "commonjs", name: regexpMatch[2], path: generatePath(importedFile.path, regexpMatch[3]), varType: regexpMatch[1] as varType }
            }
            catch(err) {
              logger.error(`could not resolve commonjs import for "${regexpMatch}"`)
            }
  
            return { type: "commonjs", name: regexpMatch[2], path: "broken/path"}
          })
        )
      ]
    }

    imports.forEach((imp) => {
      imports = [...imports, ...getDependencies(config, imp)]
    })

    return imports
  } else {
    logger.error("file not found")
    return []
  }
}