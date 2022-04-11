"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var esprima = require("esprima-next");
function getDependencies(dependency) {
    var dependencies = [];
    var file = fs.readFileSync(path.resolve(dependency), { encoding: 'utf-8' });
    var parsed = esprima.parseModule(file);
    for (var i = 0; i < parsed.body.length; i++) {
        var node = parsed.body[i];
        if (node.type === 'ImportDeclaration') {
            var val = (path.join(dependency.split("/").slice(0, -1).join("/"), node.source.value)) + '.js';
            dependencies.push(path.resolve(val));
            dependencies = dependencies.concat(getDependencies(val));
        }
    }
    return dependencies;
}
exports.default = getDependencies;
