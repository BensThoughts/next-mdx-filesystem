import {
  PageData,
  Expand,
  StaticPath,
  PageDataOpts,
} from '../interface.js';

import {getDirectoryTree} from '../tree/index.js';
import {getDirectoryArray} from '../array/index.js';
import {getBlogPostData} from '../data/index.js';
import {
  slugArrayToString,
  getPathEntry,
} from '../path/index.js';
import {getAllSlugs} from '../slugs/index.js';

export class MdxFilesystem<T> {
  async getPageData
    <R extends 'tree' | 'array' = 'tree'>(
      args?: PageDataOpts<R>
    ): Promise<Expand<PageData<T, R>>>;

  async getPageData
    <R extends 'tree' | 'array' = 'tree'>(
      args?:PageDataOpts<R>,
  ) {
      const dirOptions = args?.dirOptions;
      const returnType = dirOptions?.returnType || 'tree';
      const shallow = dirOptions?.shallow === true ? true : false;
      const reSortArray = dirOptions?.reSortArray === false ? false : true;

      const slug = args?.slugArray ? slugArrayToString(args.slugArray) : '';
      const {pathType, fullPath} = getPathEntry(slug);

      if (pathType === 'dir') {
        const result = returnType === 'tree' ? {
          isDirectory: true,
          directory: getDirectoryTree<T>(fullPath, shallow),
        } : {
          isDirectory: true,
          directory: getDirectoryArray<T>(fullPath, shallow, reSortArray),
        };
        return result as Expand<PageData<T, R>>;
      } else if (pathType === 'mdx') {
        return {
          isDirectory: false,
          mdxArticle: getBlogPostData<T>(fullPath, true),
        };
      }
    }

  getSlugs(): Expand<StaticPath>[];
  getSlugs() {
    const {directories, mdxArticles} = getAllSlugs();

    return [...directories, ...mdxArticles];
  };
}
