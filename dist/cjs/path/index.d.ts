import { Dirent } from 'fs';
export declare const getFileName: (fullPath: string) => string;
export declare const getDirIndex: (dirPath: string) => string;
export declare const slugToArray: (slug: string) => string[];
export declare const slugArrayToFullPath: (slugArr: string[]) => string;
export declare const getSlugFromFullPath: (fullPath: string) => string;
export declare const getFullPathFromSlug: (slug: string) => string;
export declare const getPathData: (cwd: string, dirent: Dirent) => {
    fullPath: string;
    slug: string;
    isMdx: boolean;
    isDirectory: boolean;
    isExcludedPath: boolean;
};
