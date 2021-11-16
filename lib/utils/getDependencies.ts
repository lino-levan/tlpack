import * as fs from 'fs';
import { Logger } from './Logger';
import * as path from 'path';
import { configShape, importedFileShape, importStatementGroupRegexp } from './constants';

export default function getDependencies(config: configShape, importedFile: importedFileShape): importedFileShape[] {
  let logger = new Logger(config.verbose)

  if(fs.existsSync(importedFile.path)) {
    let file = fs.readFileSync(importedFile.path, {encoding: 'utf-8'})
    let importStatements = Array.from(file.matchAll(importStatementGroupRegexp))

    if (importStatements === null)
      return []

    let imports = importStatements.map(regexpMatch => {
      let finalPath = path.join(path.resolve(path.dirname(importedFile.path)), regexpMatch[2])

      if(!fs.existsSync(finalPath)) {
        if(fs.existsSync(finalPath+'.js')) {
          finalPath += '.js'
        } else if(fs.existsSync(finalPath+'.ts')) {
          finalPath += '.ts'
        } else {
          logger.error(`could not resolve import for "${regexpMatch}"`)
        }
      }

      return { type: regexpMatch[1], path: finalPath }
    })

    imports.forEach((imp) => {
      imports = [...imports, ...getDependencies(config, imp)]
    })

    return imports
  } else {
    logger.error("file not found")
    return []
  }
}