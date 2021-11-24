export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// type ExpandRecursively<T> = T extends object
//   ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
//   : T;

export type DirectoryTree<T = {}> = DirectoryData<T> & {
  directories: DirectoryTree<T>[];
}

export interface DirectoryData<T = {}> {
  dirName: string;
  dirMtimeDate: string;
  dirMetadata: {
    title: string;
    date: string;
    slug: string;
    description: string | null;
  }
  mdxFiles: MdxFileData<T>[]
}

export type MdxMetadata<T = {}> = {
  slug: string,
  title: string,
  date: string,
} & T;
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
