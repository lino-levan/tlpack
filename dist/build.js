"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var getConfig_1 = require("./utils/getConfig");
var writeDist_1 = require("./utils/writeDist");
var Logger_1 = require("./utils/Logger");
var config = (0, getConfig_1.default)();
var logger = new Logger_1.Logger(config.verbose);
function buildOnce() {
    try {
        logger.success("build started");
        logger.debug("loaded in verbose mode");
        logger.time("build finished in");
        (0, writeDist_1.default)();
        logger.timeEnd("build finished in");
    }
    catch (err) {
        if (logger.verbose) {
            logger.error(err.toString());
        }
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
