declare type colorName = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
export declare class Logger {
    verbose: boolean;
    constructor(verbose: boolean);
    private printWithColor;
    error(...args: string[]): void;
    warning(...args: string[]): void;
    success(...args: string[]): void;
    debug(...args: string[]): void;
    print(color: colorName, ...args: string[]): void;
    time(name: string): void;
    timeEnd(name: string): void;
}
declare let logger: Logger;
export default logger;
