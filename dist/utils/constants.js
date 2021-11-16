"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importStatementRegexp = exports.importStatementGroupRegexp = void 0;
exports.importStatementGroupRegexp = /import\s\S+\sfrom\s["'](.+)["']/gm;
exports.importStatementRegexp = /import\s\S+\sfrom\s["'].+["']/gm;
