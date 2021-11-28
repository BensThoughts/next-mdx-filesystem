export declare type Expand<T> = T extends infer O ? {
    [K in keyof O]: O[K];
} : never;
export interface DirMetadata {
    dirName: string;
    dirMtimeDate: string;
    dirMetadata: {
        slug: string;
        title: string;
        date: string;
        description: string | null;
    };
}
export declare type DirectoryData<T = {}> = DirMetadata & {
    mdxFiles: MdxFileData<T>[];
};
export declare type DirectoryTree<T = {}> = DirectoryData<T> & {
    directories: DirectoryTree<T>[];
};
export declare type MdxMetadata<T = {}> = Expand<{
    slug: string;
    title: string;
    date: string;
} & Expand<Partial<T>>>;
export interface MdxFileData<T = {}> {
    fileName: string;
    mtimeDate: string;
    content: string | null;
    metadata: MdxMetadata<T>;
}
export interface PageData<T, R extends 'tree' | 'array' = 'tree'> {
    isDirectory: boolean;
    directory?: R extends 'tree' ? DirectoryTree<T> : DirectoryData<T>[];
    mdxFile?: Expand<MdxFileData<T>>;
}
export interface PageDataOpts<R extends 'tree' | 'array' = 'tree'> {
    slugArray?: string[];
    dirOptions?: {
        returnType?: R;
        shallow?: boolean;
        reSortArray?: boolean;
    };
}
export interface GlobalConfig {
    postsDir: string;
    excludedProdDirs: string[];
    dirIndexFile: string;
}
export interface SlugData {
    directories: StaticPath[];
    mdxFiles: StaticPath[];
}
export interface StaticPath {
    params: {
        slug: string[];
    };
}
