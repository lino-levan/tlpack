"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
function readFile(fileName, folder) {
    var standardModuleRegex = /.\/.*/;
    // TODO: add support for link imports
    var linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (standardModuleRegex.test(fileName)) { // Read module like normal
        return path.join(folder, fileName) + ".js";
    }
    // TODO: add support for node_modules
    // else { // Read the module from node_modules
    //   let dir = path.resolve(path.join("node_modules", fileName))
    //   let pack = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), {encoding: "utf-8"}))
    //   return path.join(dir, pack.module)
    // }
    return "";
}
exports.default = readFile;
