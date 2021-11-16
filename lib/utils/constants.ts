export const importStatementGroupRegexp = /import\s(.+)\sfrom\s["'](.+)["']/gm
export const importStatementRegexp = /import\s.+\sfrom\s["'].+["']/gm
export const exportRegexp = /export\s/gm
export const exportGroupRegexp = /export\s(\S+)\s(\S+)/gm

export type compilationLevelType = 'WHITESPACE_ONLY' | 'SIMPLE' | 'ADVANCED'

export interface configShape {
  entry: string,
  out: string,
  compilationLevel: compilationLevelType
  verbose: boolean
}
export interface importedFileShape {
  type: string,
  path: string
}