import * as fs from 'fs';
import * as path from 'path';
import { importStatementRegexp } from './constants';
import getConfig from './getConfig';

const compressor = require('node-minify')

let config = getConfig()

export default function buildFile(dependencies: string[]) {
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