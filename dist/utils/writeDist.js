"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var esprima = require("esprima-next");
var escodegen = require("escodegen");
var getConfig_1 = require("./getConfig");
var constants_1 = require("./constants");
// function that creates a dist folder
var config = (0, getConfig_1.default)();
var parts = new Set();
function writeDist() {
    var dist = path.resolve('./dist');
    if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist);
    }
    parts = new Set();
    getFile(path.resolve(config.entry), true);
    console.log(parts);
    fs.writeFileSync(path.resolve(config.out), Array.from(parts).join("\n").trim());
}
exports.default = writeDist;
function getFile(fileName, main) {
    var finalFile = fs.readFileSync(fileName, { encoding: 'utf-8' });
    var parsed = esprima.parseModule(finalFile);
    var generated = "";
    var fileExports = {};
    if (!main) {
        generated += "function " + (0, constants_1.hash)(fileName) + "() {\n";
    }
    for (var i = 0; i < parsed.body.length; i++) {
        var node = parsed.body[i];
        if (node.type === "ImportDeclaration") {
            var p = path.join(fileName.split("/").slice(0, -1).join("/"), node.source.value) + ".js";
            getFile(p, false);
            for (var i_1 = 0; i_1 < node.specifiers.length; i_1++) {
                var specifier = node.specifiers[i_1];
                if (specifier.type === "ImportDefaultSpecifier") {
                    generated += "let " + specifier.local.name + " = " + (0, constants_1.hash)(p) + "().default\n";
                }
                else if (specifier.type === "ImportSpecifier") {
                    generated += "let " + specifier.local.name + " = " + (0, constants_1.hash)(p) + "()." + specifier.local.name + "\n";
                }
            }
        }
        else if (node.type === "ExportDefaultDeclaration") {
            var declaration = node.declaration.id.name;
            fileExports["default"] = declaration;
            generated += escodegen.generate(node.declaration) + "\n";
        }
        else if (node.type === "ExportNamedDeclaration") {
            var declaration = node.declaration.id.name;
            fileExports[declaration] = declaration;
            generated += escodegen.generate(node.declaration) + "\n";
        }
        else {
            generated += escodegen.generate(node) + "\n";
        }
    }
    if (!main) {
        generated += "return {\n";
        for (var _i = 0, _a = Object.keys(fileExports); _i < _a.length; _i++) {
            var key = _a[_i];
            generated += "  " + key + ": " + fileExports[key] + ",\n";
        }
        generated += "}\n";
        generated += "}\n";
    }
    parts.add(generated);
}
