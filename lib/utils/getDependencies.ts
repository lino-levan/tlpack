import * as fs from 'fs';
import Logger from './Logger';
import * as path from 'path';
import { importStatementGroupRegexp } from './constants';

export default function getDependencies(filePath: string): string[] {
  if(fs.existsSync(filePath)) {
    let file = fs.readFileSync(filePath, {encoding: 'utf-8'})
    let importStatements = Array.from(file.matchAll(importStatementGroupRegexp))

    if (importStatements === null)
      return []

    let imports = importStatements.map(regexpMatch => {
      let finalPath = path.join(path.resolve(path.dirname(filePath)), regexpMatch[1])

      if(!fs.existsSync(finalPath)) {
        if(fs.existsSync(finalPath+'.js')) {
          finalPath += '.js'
        } else if(fs.existsSync(finalPath+'.ts')) {
          finalPath += '.ts'
        } else {
          Logger.error(`could not resolve import for "${regexpMatch}"`)
        }
      }

      return finalPath
    })

    imports.forEach((imp) => {
      imports = [...imports, ...getDependencies(imp)]
    })

    return imports
  } else {
    Logger.error("file not found")
    return []
  }
}