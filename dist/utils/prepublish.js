"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var constants_1 = require("./constants");
var packagePath = path.join(__dirname, '../../package.json');
var p = JSON.parse(fs.readFileSync(packagePath, { encoding: 'utf-8' }));
p.version = constants_1.version;
fs.writeFileSync(packagePath, JSON.stringify(p, null, 2));
