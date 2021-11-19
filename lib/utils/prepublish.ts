import * as fs from 'fs'
import * as path from 'path'
import { version } from './constants'

let packagePath = path.join(__dirname, '../../package.json')

let p = JSON.parse(fs.readFileSync(packagePath, {encoding: 'utf-8'}))

p.version = version

fs.writeFileSync(packagePath, JSON.stringify(p, null, 2))
