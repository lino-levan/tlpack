"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportGroupRegexp = exports.exportRegexp = exports.importStatementRegexp = exports.importStatementGroupRegexp = void 0;
exports.importStatementGroupRegexp = /import\s(.+)\sfrom\s["'](.+)["']/gm;
exports.importStatementRegexp = /import\s.+\sfrom\s["'].+["']/gm;
exports.exportRegexp = /export\s/gm;
exports.exportGroupRegexp = /export\s(\S+)\s(\S+)/gm;
