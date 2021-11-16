import * as fs from 'fs';
import * as path from 'path';
import Logger from './Logger';

let defaultConfig = {
  entry: './src/index.js',
  out: './dist/index.js'
}

export default function getConfig() {
  let configExists = fs.existsSync('./tspack.config.json')
  let config = defaultConfig

  if(configExists) {
    try {
      config = {...config, ...JSON.parse(fs.readFileSync('./tspack.config.json', {encoding: 'utf-8'}))}
      Logger.success("found and loaded configuration file")
    }
    catch(err) {
      Logger.error("config file isn't in JSON format")
    }

    try {
      config.entry = fs.lstatSync(config.entry).isDirectory()? path.join(config.entry, 'index.js') : config.entry
    }
    catch(err) {
      Logger.error("failed to load entry file, make sure you have it in the right spot")
    }

  } else {
    Logger.warning("no configuration file found, consider creating a \"tspack.config.json\" file")
  }

  return config
}