export const importStatementGroupRegexp = /import\s(.+)\sfrom\s["'](.+)["']/gm
export const importStatementRegexp = /import\s.+\sfrom\s["'].+["']/gm
export const exportRegexp = /export\s/gm
export const exportGroupRegexp = /export\s(\S+)\s(\S+)/gm

export interface configShape {
  entry: string,
  out: string,
  verbose: boolean
}
export interface importedFileShape {
  type: string,
  path: string
}