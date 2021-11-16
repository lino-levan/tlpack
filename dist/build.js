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
var path = require("path");
var buildFile_1 = require("./utils/buildFile");
var getConfig_1 = require("./utils/getConfig");
var getDependencies_1 = require("./utils/getDependencies");
var Logger_1 = require("./utils/Logger");
var config = (0, getConfig_1.default)();
function build(watch) {
    if (watch) {
    }
    else {
        Logger_1.default.time("build finished in");
        var dependencies = __spreadArray([path.resolve(config.entry)], (0, getDependencies_1.default)(config.entry), true).reverse();
        (0, buildFile_1.default)(dependencies);
        Logger_1.default.timeEnd("build finished in");
    }
    return true;
}
exports.default = build;
