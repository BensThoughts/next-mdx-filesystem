export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// type ExpandRecursively<T> = T extends object
//   ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
//   : T;

export interface DirMetadata {
  dirName: string;
  dirMtimeDate: string;
  dirMetadata: {
    slug: string;
    title: string;
    date: string;
    description: string | null;
  }
}

export type DirectoryData<T = {}> = DirMetadata & {
  mdxFiles: MdxFileData<T>[]
}

export type DirectoryTree<T = {}> = DirectoryData<T> & {
  directories: DirectoryTree<T>[];
}

export type MdxMetadata<T= {}> = {
  slug: string;
  title: string;
  date: string;
} & Expand<Partial<T>>;
export interface MdxFileData<T = {}> {
  fileName: string;
  mtimeDate: string;
  content: string | null;
  metadata: Expand<MdxMetadata<T>>;
}

export interface PageData<T, R extends 'tree' | 'array' = 'tree'> {
  isDirectory: boolean;
  directory?: R extends 'tree' ? DirectoryTree<T> : DirectoryData<T>[];
  mdxFile?: Expand<MdxFileData<T>>;
}

export interface PageDataOpts<R extends 'tree' | 'array' = 'tree'> {
  slugArray?: string[],
  dirOptions?: {
    returnType?: R,
    shallow?: boolean,
    reSortArray?: boolean,
  },
}

export interface GlobalConfig {
  postsDir: string;
  excludedProdDirs: string[];
  dirIndexFile: string;
}
export interface SlugData {
  directories: StaticPath[],
  mdxFiles: StaticPath[],
}

export interface StaticPath {
  params: {
    slug: string[];
  }
}
