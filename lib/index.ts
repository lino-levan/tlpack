#!/usr/bin/env node
import build from './build'
import { commandTypes, getVersion } from './utils/constants'

const commands = {
  watch: ()=>build(true),
  version: ()=>console.log(`TLPack version: ${getVersion()}`)
}

if(process.argv.length > 2) {
  if(commands.hasOwnProperty(process.argv[2])) {
    commands[process.argv[2] as commandTypes]()
  } else {
    console.log("Unknown Command")
  }
} else {
  build(false)
}
