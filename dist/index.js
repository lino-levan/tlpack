#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var build_1 = require("./build");
// TODO: Implement watch vs non-watch mode
(0, build_1.default)(process.argv.includes('watch'));
