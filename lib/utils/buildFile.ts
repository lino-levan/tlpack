import * as fs from 'fs';
import * as path from 'path';
import { importStatementRegexp } from './constants';

const compressor = require('node-minify')

export default function buildFile(config: any, dependencies: string[]) {
  let finalFile = ''

  dependencies.forEach((depedency) => {
    finalFile += fs.readFileSync(depedency, {encoding: 'utf-8'}).split(importStatementRegexp).join('') + '\n'
  })

  fs.mkdirSync(path.dirname(config.out), { recursive: true })

  fs.writeFileSync(config.out, finalFile)

  compressor.minify({
    compressor: 'gcc',
    input: config.out,
    output: config.out
  })
}