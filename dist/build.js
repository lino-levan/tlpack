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
var path = require("path");
var buildFile_1 = require("./utils/buildFile");
var getConfig_1 = require("./utils/getConfig");
var getDependencies_1 = require("./utils/getDependencies");
var Logger_1 = require("./utils/Logger");
var config = (0, getConfig_1.default)();
function buildOnce() {
    try {
        Logger_1.default.success("build started");
        Logger_1.default.time("build finished in");
        var dependencies = __spreadArray([path.resolve(config.entry)], (0, getDependencies_1.default)(config.entry), true).reverse();
        (0, buildFile_1.default)(config, dependencies);
        Logger_1.default.timeEnd("build finished in");
    }
    catch (err) {
        Logger_1.default.error("build failed");
    }
}
function build(watch) {
    if (watch) {
        fs.watch(path.dirname(config.entry), { recursive: true }, function (event) {
            buildOnce();
        });
    }
    else {
        buildOnce();
    }
    return true;
}
exports.default = build;
