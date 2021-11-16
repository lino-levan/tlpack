"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var constants_1 = require("./constants");
var compressor = require('node-minify');
function buildFile(config, dependencies) {
    var finalFile = '';
    dependencies.forEach(function (depedency) {
        finalFile += fs.readFileSync(depedency, { encoding: 'utf-8' }).split(constants_1.importStatementRegexp).join('') + '\n';
    });
    fs.mkdirSync(path.dirname(config.out), { recursive: true });
    fs.writeFileSync(config.out, finalFile);
    compressor.minify({
        compressor: 'gcc',
        input: config.out,
        output: config.out
    });
}
exports.default = buildFile;
