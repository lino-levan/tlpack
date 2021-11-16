"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// console color codes from: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
var colorObj = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.printWithColor = function (color, text) {
        console.log(colorObj[color] + text);
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.printWithColor('red', 'Error: ' + Array.from(args).join(''));
    };
    Logger.prototype.warning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.printWithColor('yellow', 'Warning: ' + Array.from(args).join(''));
    };
    Logger.prototype.success = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.printWithColor('green', Array.from(args).join(''));
    };
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.printWithColor('white', Array.from(args).join(''));
    };
    Logger.prototype.print = function (color) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.printWithColor(color, Array.from(args).join(''));
    };
    Logger.prototype.time = function (name) {
        console.time(name);
    };
    Logger.prototype.timeEnd = function (name) {
        process.stdout.write(colorObj['green']);
        console.timeEnd(name);
    };
    return Logger;
}());
var logger = new Logger();
exports.default = logger;
