import * as fs from 'fs';
import * as path from 'path';
import buildFile from './utils/buildFile';
import getConfig from './utils/getConfig';
import getDependencies from './utils/getDependencies';
import Logger from './utils/Logger';

let config = getConfig()

export default function build(watch: boolean) {
  if(watch) {

  } else {
    Logger.time("build finished in")
    let dependencies = [path.resolve(config.entry), ...getDependencies(config.entry)].reverse()

    buildFile(dependencies)

    Logger.timeEnd("build finished in")
  }

  return true
}