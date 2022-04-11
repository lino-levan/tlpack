import * as fs from 'fs';
import * as path from 'path';
import getConfig from './utils/getConfig';
import getDependencies from './utils/getDependencies';
import writeDist from './utils/writeDist';
import { Logger } from './utils/Logger';

let config = getConfig()
let logger = new Logger(config.verbose)

function buildOnce() {
  try {
    logger.success("build started")
    logger.debug("loaded in verbose mode")

    logger.time("build finished in")

    let dependencies = getDependencies(config.entry)

    writeDist(dependencies)
    
    logger.timeEnd("build finished in")
  }
  catch(err: any) {
    if(logger.verbose) {
      logger.error(err.toString())
    }
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