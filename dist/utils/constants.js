"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.hash = exports.exportGroupRegexp = exports.exportRegexp = exports.importRequireRegexp = exports.importRequireGroupRegexp = exports.importES6Regexp = exports.importES6GroupRegexp = void 0;
var crypto = require("crypto");
exports.importES6GroupRegexp = /import\s(.+)\sfrom\s["'](.+)["']/gm;
exports.importES6Regexp = /import\s.+\sfrom\s["'].+["']/gm;
exports.importRequireGroupRegexp = /(const|var|let)\s(\S+)\s*=\s*require\(['"](.+)['"]\)/gm;
exports.importRequireRegexp = /(?:const|var|let)\s\S+\s*=\s*require\(['"].+['"]\)/gm;
exports.exportRegexp = /export\s/gm;
exports.exportGroupRegexp = /export\s(\S+)\s(\S+)/gm;
function hash(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}
exports.hash = hash;
exports.version = '1.0.10';
