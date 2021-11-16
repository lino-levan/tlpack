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
function getDependencies(filePath) {
    if (fs.existsSync(filePath)) {
        var file = fs.readFileSync(filePath, { encoding: 'utf-8' });
        var importStatements = Array.from(file.matchAll(constants_1.importStatementGroupRegexp));
        if (importStatements === null)
            return [];
        var imports_1 = importStatements.map(function (regexpMatch) {
            var finalPath = path.join(path.resolve(path.dirname(filePath)), regexpMatch[1]);
            if (!fs.existsSync(finalPath)) {
                if (fs.existsSync(finalPath + '.js')) {
                    finalPath += '.js';
                }
                else if (fs.existsSync(finalPath + '.ts')) {
                    finalPath += '.ts';
                }
                else {
                    Logger_1.default.error("could not resolve import for \"" + regexpMatch + "\"");
                }
            }
            return finalPath;
        });
        imports_1.forEach(function (imp) {
            imports_1 = __spreadArray(__spreadArray([], imports_1, true), getDependencies(imp), true);
        });
        return imports_1;
    }
    else {
        Logger_1.default.error("file not found");
        return [];
    }
}
exports.default = getDependencies;
