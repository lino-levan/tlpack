import * as fs from 'fs';
import * as path from 'path';
import buildFile from './utils/buildFile';
import getConfig from './utils/getConfig';
import getDependencies from './utils/getDependencies';
import Logger from './utils/Logger';

let config = getConfig()

function buildOnce() {
  try {
    Logger.success("build started")
    Logger.time("build finished in")
    let dependencies = [path.resolve(config.entry), ...getDependencies(config.entry)].reverse()

    buildFile(config, dependencies)

    Logger.timeEnd("build finished in")
  }
  catch(err) {
    Logger.error("build failed")
  }
}

export default function build(watch: boolean) {
  if(watch) {
    fs.watch(path.dirname(config.entry), {recursive: true}, (event) => {
      buildOnce()
    })
  } else {
    buildOnce()
  }

  return true
}