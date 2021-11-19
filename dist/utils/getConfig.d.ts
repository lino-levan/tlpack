import { compilationLevelType, configShape } from './constants';
export declare const defaultConfig: {
    entry: string;
    out: string;
    compilationLevel: compilationLevelType;
    verbose: boolean;
};
export default function getConfig(): configShape;
