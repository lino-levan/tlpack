import * as crypto from 'crypto'

export type compilationLevelType = 'WHITESPACE_ONLY' | 'SIMPLE' | 'ADVANCED'
export type commandTypes = 'watch' | 'version'

export interface configShape {
  entry: string,
  out: string,
  compilationLevel: compilationLevelType
  verbose: boolean
}

export function hash(string: string) {
  return "generated_"+crypto.createHash('md5').update(string).digest('hex')
}

export const version = '1.1.2'