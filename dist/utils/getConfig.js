"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
var fs = require("fs");
var path = require("path");
var Logger_1 = require("./Logger");
var ran = false;
exports.defaultConfig = {
    entry: './src/index.js',
    out: './dist/index.js',
    compilationLevel: 'SIMPLE',
    verbose: false
};
function getConfig() {
    var configExists = fs.existsSync('./tlpack.config.json');
    var config = exports.defaultConfig;
    if (configExists) {
        try {
            config = __assign(__assign({}, config), JSON.parse(fs.readFileSync('./tlpack.config.json', { encoding: 'utf-8' })));
            if (!ran)
                Logger_1.default.success("found and loaded configuration file");
        }
        catch (err) {
            if (!ran)
                Logger_1.default.error("config file isn't in JSON format");
        }
        try {
            config.entry = fs.lstatSync(config.entry).isDirectory() ? path.join(config.entry, 'index.js') : config.entry;
        }
        catch (err) {
            if (!ran)
                Logger_1.default.error("failed to load entry file, make sure you have it in the right spot");
        }
    }
    else {
        if (!ran)
            Logger_1.default.warning("no configuration file found, consider creating a \"tlpack.config.json\" file");
    }
    ran = true;
    return config;
}
exports.default = getConfig;
