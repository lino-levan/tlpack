import * as path from "path"
import * as fs from "fs"
import * as esprima from 'esprima-next'
import * as escodegen from 'escodegen'

// @ts-ignore
import * as minify from '@node-minify/core'
// @ts-ignore
import * as uglify from '@node-minify/uglify-js'

import getConfig from "./getConfig"
import { hash } from "./constants"
import readFile from "./readFile"

// function that creates a dist folder
let config = getConfig()

let parts: Set<string> = new Set()

export default function writeDist() {
  let dist = path.resolve('./dist')
  if(!fs.existsSync(dist)) {
    fs.mkdirSync(dist)
  }

  parts = new Set()

  getFile(path.resolve(config.entry), true)

  minify({
    compressor: uglify,
    content: Array.from(parts).join("\n").trim(),
    output: path.resolve(config.out),
    callback: (err:string, min: string)=> {
      fs.writeFileSync(path.resolve(config.out), min)
    }
  })
}

function getFile(fileName: string, main: boolean) {
  let finalFile = fs.readFileSync(fileName, {encoding: 'utf-8'})
  let parsed = esprima.parseModule(finalFile)

  let generated = ""

  let fileExports: Record<string, string> = {}

  if(!main) {
    generated += `function ${hash(fileName)}() {\n`
  }

  for(let i = 0; i < parsed.body.length; i++) {
    let node = parsed.body[i]

    if(node.type === "ImportDeclaration") {
      let p = readFile(node.source.value as string, fileName.split("/").slice(0, -1).join("/"))
      getFile(p, false)

      for(let i = 0; i < node.specifiers.length; i++) {
        let specifier = node.specifiers[i]
        if(specifier.type === "ImportDefaultSpecifier") {
          generated += `let ${specifier.local.name} = ${hash(p)}().default\n`
        } else if(specifier.type === "ImportSpecifier") {
          generated += `let ${specifier.local.name} = ${hash(p)}().${specifier.local.name}\n`
        }
      }
    } else if(node.type === "ExportDefaultDeclaration") {
      let declaration = (node.declaration as any).id.name
      fileExports["default"] = declaration
      generated += escodegen.generate(node.declaration) + "\n"
    } else if(node.type === "ExportNamedDeclaration") {
      let declaration = (node.declaration as any).id.name
      fileExports[declaration] = declaration
      generated += escodegen.generate(node.declaration) + "\n"
    } else {
      generated += escodegen.generate(node) + "\n"
    }
  }

  if(!main) {
    generated += `return {\n`
    for(let key of Object.keys(fileExports)) {
      generated += `  ${key}: ${fileExports[key]},\n`
    }
    generated += `}\n`
    generated += `}\n`
  }

  parts.add(generated)
}