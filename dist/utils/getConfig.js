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
var fs = require("fs");
var path = require("path");
var Logger_1 = require("./Logger");
var defaultConfig = {
    entry: './src/index.js',
    out: './dist/index.js'
};
function getConfig() {
    var configExists = fs.existsSync('./tspack.config.json');
    var config = defaultConfig;
    if (configExists) {
        try {
            config = __assign(__assign({}, config), JSON.parse(fs.readFileSync('./tspack.config.json', { encoding: 'utf-8' })));
            Logger_1.default.success("found and loaded configuration file");
        }
        catch (err) {
            Logger_1.default.error("config file isn't in JSON format");
        }
        try {
            config.entry = fs.lstatSync(config.entry).isDirectory() ? path.join(config.entry, 'index.js') : config.entry;
        }
        catch (err) {
            Logger_1.default.error("failed to load entry file, make sure you have it in the right spot");
        }
    }
    else {
        Logger_1.default.warning("no configuration file found, consider creating a \"tspack.config.json\" file");
    }
    return config;
}
exports.default = getConfig;