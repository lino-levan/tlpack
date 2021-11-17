"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var constants_1 = require("./constants");
var Logger_1 = require("./Logger");
var compressor = require('node-minify');
function buildFile(config, dependencies) {
    var logger = new Logger_1.Logger(config.verbose);
    var finalFile = '';
    dependencies.forEach(function (depedency) {
        var varType = depedency.varType ? depedency.varType : 'let';
        var processedFile = fs.readFileSync(depedency.path, { encoding: 'utf-8' });
        processedFile = processedFile.replace(constants_1.importES6Regexp, '').replace(constants_1.importRequireRegexp, '');
        if (depedency.type === 'es6' && depedency.name !== '*') {
            var exportStatements = Array.from(processedFile.matchAll(constants_1.exportGroupRegexp));
            var returnStatement_1 = '{';
            exportStatements.forEach(function (exportStatement) {
                if (exportStatement[1] === 'function') {
                    returnStatement_1 += exportStatement[2].replace('()', '');
                }
                else {
                    returnStatement_1 += exportStatement[2];
                }
                returnStatement_1 += ', ';
            });
            returnStatement_1 += '}';
            processedFile = "\n        " + varType + " " + depedency.name + " = (function () {\n          " + processedFile.replace(constants_1.exportRegexp, '') + "\n\n          return " + returnStatement_1 + "\n        })()";
        }
        if (depedency.type === 'commonjs') {
            var exportStatements = Array.from(processedFile.matchAll(constants_1.exportGroupRegexp));
            var returnStatement_2 = '{';
            exportStatements.forEach(function (exportStatement) {
                if (exportStatement[1] === 'function') {
                    returnStatement_2 += exportStatement[2].replace('()', '');
                }
                else {
                    returnStatement_2 += exportStatement[2];
                }
                returnStatement_2 += ', ';
            });
            returnStatement_2 += '}';
            processedFile = "\n        " + varType + " " + depedency.name + " = (function () {\n          let module = {exports:\"invalid\"}\n\n          " + processedFile + "\n\n          return module.exports\n        })()";
        }
        finalFile += processedFile + '\n';
    });
    fs.mkdirSync(path.dirname(config.out), { recursive: true });
    fs.writeFileSync(config.out, finalFile);
    logger.debug('done compiling, optimizing...');
    compressor.minify({
        compressor: 'gcc',
        input: config.out,
        output: config.out,
        options: {
            compilationLevel: config.compilationLevel
        }
    }).catch(function (err) {
        logger.error("failed to minify, error in code\n" + err);
        fs.writeFileSync(config.out, finalFile);
    });
    logger.debug('minified and optimized...');
}
exports.default = buildFile;
