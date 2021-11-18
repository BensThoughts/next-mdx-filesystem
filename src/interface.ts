export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// type ExpandRecursively<T> = T extends object
//   ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
//   : T;

export type DirectoryTree<T> = DirectoryData<T> & {
  directories: DirectoryTree<T>[];
}

export interface DirectoryData<T> {
    dirName: string;
    dirMtimeDate: string;
    dirMetadata: {
      title: string;
      date: string;
      slug: string;
      description: string | null;
    }
    mdxArticles: MdxArticleData<T>[]
  }

export interface MdxArticleData<T> {
  fileName: string;
  mtimeDate: string;
  content?: string;
  metadata: {
    title: string;
    date: string;
    slug: string;
  } & T;
}

export interface PageData<T, R extends 'tree' | 'array' = 'tree'> {
  isDirectory: boolean;
  directory?: {
    data: R extends 'tree' ? DirectoryTree<T> : DirectoryData<T>[];
  },
  article?: MdxArticleData<T>;
}

export interface IConfig {
  POSTS_DIR: string;
  EXCLUDED_PROD_DIRS: string[];
  DIR_INDEX_FILE: string;
}

export interface IExportMarker {
  exportTrailingSlash: boolean
}

export interface SlugData {
  directories: StaticPath[],
  mdxArticles: StaticPath[],
}

export interface StaticPath {
  params: {
    slug: string[];
  }
}