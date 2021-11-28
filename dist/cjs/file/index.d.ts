import fs from 'fs';
export declare const readDir: (dir: string) => fs.Dirent[];
export declare const readFile: (path: string) => string;
export declare const doesPathExist: (path: string) => boolean;
export declare const isPathDir: (path: string) => boolean;
export declare const isPathFile: (path: string) => boolean;
export declare const getFileModifiedDate: (path: string) => string;
export declare const formatDate: (date: Date) => string;
