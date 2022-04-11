import * as fs from 'fs'
import * as path from 'path'
import * as esprima from 'esprima-next'

export default function getDependencies(dependency: string) {
  let dependencies: string[] = []

  let file = fs.readFileSync(path.resolve(dependency), {encoding: 'utf-8'})
  let parsed = esprima.parseModule(file)

  for(let i = 0; i < parsed.body.length; i++) {
    let node = parsed.body[i]
    if(node.type === 'ImportDeclaration') {
      let val = (path.join(dependency.split("/").slice(0, -1).join("/"), node.source.value as string)) + '.js'
      dependencies.push(path.resolve(val))
      dependencies = dependencies.concat(getDependencies(val))
    }
  }

  return dependencies
}