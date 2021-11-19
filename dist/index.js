#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var build_1 = require("./build");
var constants_1 = require("./utils/constants");
var commands = {
    watch: function () { return (0, build_1.default)(true); },
    version: function () { return console.log("TLPack version: " + constants_1.version); }
};
if (process.argv.length > 2) {
    if (commands.hasOwnProperty(process.argv[2])) {
        commands[process.argv[2]]();
    }
    else {
        console.log("Unknown Command");
    }
}
else {
    (0, build_1.default)(false);
}
