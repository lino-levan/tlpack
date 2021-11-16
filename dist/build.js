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
var logger = new Logger_1.Logger(config.verbose);
function buildOnce() {
    try {
        logger.success("build started");
        logger.debug("loaded in verbose mode");
        logger.time("build finished in");
        var dependencies = __spreadArray([{ type: '*', path: path.resolve(config.entry) }], (0, getDependencies_1.default)(config, { type: '*', path: config.entry }), true).reverse();
        logger.debug("got dependencies", dependencies.map(function (file) { return file.path; }).join(' '));
        (0, buildFile_1.default)(config, dependencies);
        logger.timeEnd("build finished in");
    }
    catch (err) {
        logger.error("build failed");
    }
}
function build(watch) {
    buildOnce();
    if (watch) {
        fs.watch(path.dirname(config.entry), { recursive: true }, function (event) {
            buildOnce();
        });
    }
    return true;
}
exports.default = build;
