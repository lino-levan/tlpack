export declare const importES6GroupRegexp: RegExp;
export declare const importES6Regexp: RegExp;
export declare const importRequireGroupRegexp: RegExp;
export declare const importRequireRegexp: RegExp;
export declare const exportRegexp: RegExp;
export declare const exportGroupRegexp: RegExp;
export declare type compilationLevelType = 'WHITESPACE_ONLY' | 'SIMPLE' | 'ADVANCED';
export declare type varType = 'let' | 'const' | 'var';
export interface configShape {
    entry: string;
    out: string;
    compilationLevel: compilationLevelType;
    verbose: boolean;
}
export interface importedFileShape {
    type: string;
    name: string;
    path: string;
    varType?: varType;
}
export declare function hash(string: string): string;
