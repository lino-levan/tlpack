"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Logger_1 = require("./Logger");
var path = require("path");
var constants_1 = require("./constants");
function generatePath(from, name) {
    var finalPath = path.join(path.resolve(path.dirname(from)), name);
    if (!fs.existsSync(finalPath)) {
        if (fs.existsSync(finalPath + '.js')) {
            finalPath += '.js';
        }
        else if (fs.existsSync(finalPath + '.ts')) {
            finalPath += '.ts';
        }
    }
    return finalPath;
}
function getDependencies(config, importedFile) {
    var logger = new Logger_1.Logger(config.verbose);
    if (fs.existsSync(importedFile.path)) {
        var file = fs.readFileSync(importedFile.path, { encoding: 'utf-8' });
        var es6ImportStatements = Array.from(file.matchAll(constants_1.importES6GroupRegexp));
        var requireImportStatements = Array.from(file.matchAll(constants_1.importRequireGroupRegexp));
        var imports_1 = [];
        if (es6ImportStatements !== null) {
            imports_1 = es6ImportStatements.map(function (regexpMatch) {
                try {
                    return { type: "es6", name: regexpMatch[1], path: generatePath(importedFile.path, regexpMatch[2]) };
                }
                catch (err) {
                    logger.error("could not resolve es6 import for \"" + regexpMatch + "\"");
                }
                return { type: "es6", name: regexpMatch[1], path: "broken/path" };
            });
        }
        if (requireImportStatements !== null) {
            imports_1 = __spreadArray(__spreadArray([], imports_1, true), (requireImportStatements.map(function (regexpMatch) {
                try {
                    return { type: "commonjs", name: regexpMatch[2], path: generatePath(importedFile.path, regexpMatch[3]), varType: regexpMatch[1] };
                }
                catch (err) {
                    logger.error("could not resolve commonjs import for \"" + regexpMatch + "\"");
                }
                return { type: "commonjs", name: regexpMatch[2], path: "broken/path" };
            })), true);
        }
        imports_1.forEach(function (imp) {
            imports_1 = __spreadArray(__spreadArray([], imports_1, true), getDependencies(config, imp), true);
        });
        return imports_1;
    }
    else {
        logger.error("file not found");
        return [];
    }
}
exports.default = getDependencies;
