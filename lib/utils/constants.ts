export const importES6GroupRegexp = /import\s(.+)\sfrom\s["'](.+)["']/gm
export const importES6Regexp = /import\s.+\sfrom\s["'].+["']/gm
export const importRequireGroupRegexp = /(const|var|let)\s(\S+)\s*=\s*require\(['"](.+)['"]\)/gm
export const importRequireRegexp = /(?:const|var|let)\s\S+\s*=\s*require\(['"].+['"]\)/gm
export const exportRegexp = /export\s/gm
export const exportGroupRegexp = /export\s(\S+)\s(\S+)/gm

export type compilationLevelType = 'WHITESPACE_ONLY' | 'SIMPLE' | 'ADVANCED'
export type varType = 'let' | 'const' | 'var'

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