"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var constants_1 = require("./constants");
var getDependencies_1 = require("./getDependencies");
var Logger_1 = require("./Logger");
var compressor = require('node-minify');
function buildFile(config, dependencies) {
    var logger = new Logger_1.Logger(config.verbose);
    var finalFile = "\n    function require(file) {\n      let files = {\n        " + (function () {
        var output = '';
        dependencies.forEach(function (depedency) {
            if (depedency.type === 'commonjs') {
                var processedFile = fs.readFileSync(depedency.path, { encoding: 'utf-8' });
                output += "\"" + (0, constants_1.hash)(depedency.path) + "\": (()=> {\n                  let module = {exports:\"invalid\"}\n                  " + processedFile + "\n                  return module.exports\n                })()";
            }
        });
        return output;
    })() + "\n      }\n      return files[file]\n    }\n  ";
    dependencies.forEach(function (depedency) {
        if (depedency.type === 'commonjs')
            return;
        var varType = depedency.varType ? depedency.varType : 'let';
        var processedFile = fs.readFileSync(depedency.path, { encoding: 'utf-8' });
        processedFile = processedFile.replace(constants_1.importES6Regexp, '');
        processedFile = processedFile.replace(constants_1.importRequireGroupRegexp, function (match, variable, name, path) {
            return variable + " " + name + " = require(\"" + (0, constants_1.hash)((0, getDependencies_1.generatePath)(depedency.path, path)) + "\")";
        });
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
