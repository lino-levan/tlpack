export declare const importStatementGroupRegexp: RegExp;
export declare const importStatementRegexp: RegExp;
export declare const exportRegexp: RegExp;
export declare const exportGroupRegexp: RegExp;
export declare type compilationLevelType = 'WHITESPACE_ONLY' | 'SIMPLE' | 'ADVANCED';
export interface configShape {
    entry: string;
    out: string;
    compilationLevel: compilationLevelType;
    verbose: boolean;
}
export interface importedFileShape {
    type: string;
    path: string;
}
