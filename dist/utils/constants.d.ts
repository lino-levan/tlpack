export declare type compilationLevelType = 'WHITESPACE_ONLY' | 'SIMPLE' | 'ADVANCED';
export declare type commandTypes = 'watch' | 'version';
export interface configShape {
    entry: string;
    out: string;
    compilationLevel: compilationLevelType;
    verbose: boolean;
}
export declare function hash(string: string): string;
export declare const version = "1.1.0";
