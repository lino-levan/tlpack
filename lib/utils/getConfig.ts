import * as fs from 'fs';
import * as path from 'path';
import { compilationLevelType, configShape } from './constants';
import Logger from './Logger';

let ran = false

export const defaultConfig = {
  entry: './src/index.js',
  out: './dist/index.js',
  compilationLevel: 'SIMPLE' as compilationLevelType,
  verbose: false
}

export default function getConfig(): configShape {
  let configExists = fs.existsSync('./tlpack.config.json')
  let config = defaultConfig

  if(configExists) {
    try {
      config = {...config, ...JSON.parse(fs.readFileSync('./tlpack.config.json', {encoding: 'utf-8'}))}
      if(!ran) Logger.success("found and loaded configuration file")
    }
    catch(err) {
      if(!ran) Logger.error("config file isn't in JSON format")
    }

    try {
      config.entry = fs.lstatSync(config.entry).isDirectory()? path.join(config.entry, 'index.js') : config.entry
    }
    catch(err) {
      if(!ran) Logger.error("failed to load entry file, make sure you have it in the right spot")
    }

  } else {
    if(!ran) Logger.warning("no configuration file found, consider creating a \"tlpack.config.json\" file")
  }
  
  ran = true

  return config
}