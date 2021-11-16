export declare const importStatementGroupRegexp: RegExp;
export declare const importStatementRegexp: RegExp;
export declare const exportRegexp: RegExp;
export declare const exportGroupRegexp: RegExp;
export interface configShape {
    entry: string;
    out: string;
    verbose: boolean;
}
export interface importedFileShape {
    type: string;
    path: string;
}
