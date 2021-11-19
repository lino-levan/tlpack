import { configShape, importedFileShape } from './constants';
export declare function generatePath(from: string, name: string): string;
export default function getDependencies(config: configShape, importedFile: importedFileShape): importedFileShape[];
