import * as fs from 'fs';
import * as path from 'path';
import buildFile from './utils/buildFile';
import getConfig from './utils/getConfig';
import getDependencies from './utils/getDependencies';
import { Logger } from './utils/Logger';

let config = getConfig()
let logger = new Logger(config.verbose)

function buildOnce() {
  try {
    logger.success("build started")
    logger.debug("loaded in verbose mode")

    logger.time("build finished in")
    let dependencies = [{type: 'es6', name: '*', path: path.resolve(config.entry)}, ...getDependencies(config, {type: 'es6', name: '*', path:config.entry})].reverse()

    logger.debug("got dependencies", dependencies.map((file)=>file.path).join(' '))

    buildFile(config, dependencies)

    logger.timeEnd("build finished in")
  }
  catch(err) {
    logger.error("build failed")
  }
}

export default function build(watch: boolean) {
  buildOnce()
  if(watch) {
    fs.watch(path.dirname(config.entry), {recursive: true}, (event) => {
      buildOnce()
    })
  }

  return true
}