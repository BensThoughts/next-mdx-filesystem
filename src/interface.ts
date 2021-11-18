export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// type ExpandRecursively<T> = T extends object
//   ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
//   : T;

export type DirectoryTree<T> = IDirectoryData<T> & {
  directories: DirectoryTree<T>[];
}

export interface IDirectoryData<T> {
    dirName: string;
    dirMtimeDate: string;
    dirMetadata: {
      title: string;
      date: string;
      slug: string;
      description: string | null;
    }
    mdxArticles: IMdxArticleData<T>[]
  }

export interface IMdxArticleData<T> {
  fileName: string;
  mtimeDate: string;
  content?: string;
  metadata: {
    title: string;
    date: string;
    slug: string;
  } & T;
}

export interface IPageData<T, R extends 'tree' | 'array' = 'tree'> {
  isDirectory: boolean;
  directory?: {
    data: R extends 'tree' ? DirectoryTree<T> : IDirectoryData<T>[];
  },
  article?: IMdxArticleData<T>;
}

export interface IPageDataOpts<R extends 'tree' | 'array'> {
  slugArray?: string[],
  options?: {
    returnType?: R,
    shallow?: boolean,
    reSortArray?: boolean,
  },
}

export interface IConfig {
  postsDir: string;
  excludedProdDirs: string[];
  dirIndexFile: string;
}

export interface IExportMarker {
  exportTrailingSlash: boolean
}

export interface ISlugData {
  directories: IStaticPath[],
  mdxArticles: IStaticPath[],
}

export interface IStaticPath {
  params: {
    slug: string[];
  }
}
export interface IPathEntry {
  pathType?: 'dir' | 'mdx';
  fullPath: string;
}