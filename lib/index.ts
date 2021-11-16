#!/usr/bin/env node
import build from './build'


// TODO: Implement watch vs non-watch mode
build(process.argv.includes('watch'))