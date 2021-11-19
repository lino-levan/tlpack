import * as crypto from 'crypto'
import * as fs from 'fs'

export const importES6GroupRegexp = /import\s(.+)\sfrom\s["'](.+)["']/gm
export const importES6Regexp = /import\s.+\sfrom\s["'].+["']/gm
export const importRequireGroupRegexp = /(const|var|let)\s(\S+)\s*=\s*require\(['"](.+)['"]\)/gm
export const importRequireRegexp = /(?:const|var|let)\s\S+\s*=\s*require\(['"].+['"]\)/gm
export const exportRegexp = /export\s/gm
export const exportGroupRegexp = /export\s(\S+)\s(\S+)/gm

export type compilationLevelType = 'WHITESPACE_ONLY' | 'SIMPLE' | 'ADVANCED'
export type varType = 'let' | 'const' | 'var'
export type commandTypes = 'watch' | 'version'

export interface configShape {
  entry: string,
  out: string,
  compilationLevel: compilationLevelType
  verbose: boolean
}
export interface importedFileShape {
  type: string,
  name: string,
  path: string,
  varType?: varType
}

export function hash(string: string) {
  return crypto.createHash('md5').update(string).digest('hex')
}

export function getVersion() {
  return JSON.parse(fs.readFileSync('../../package.json', {encoding: 'utf-8'})).version
}