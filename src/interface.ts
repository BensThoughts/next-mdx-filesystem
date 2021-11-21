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
  content: string | null;
  metadata: {
    title: string;
    date: string;
    slug: string;
  } & T;
}

export interface PageData<T, R extends 'tree' | 'array' = 'tree'> {
  isDirectory: boolean;
  directory?: R extends 'tree' ? DirectoryTree<T> : Expand<DirectoryData<T>>[];
  mdxArticle?: Expand<MdxArticleData<T>>;
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
  mdxArticles: StaticPath[],
}

export interface StaticPath {
  params: {
    slug: string[];
  }
}
// export interface PathEntry {
//   pathType?: 'dir' | 'mdx';
//   fullPath: string;
// }
