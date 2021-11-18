import {
  IPageData,
  Expand,
  IStaticPath,
  IPageDataOpts,
} from '../interface';

import {getDirectoryTree} from '../tree';
import {getDirectoryArray} from '../array';
import {getBlogPostData} from '../data';
import {
  slugArrayToString,
  getPathEntry,
} from '../path';
import {getAllSlugs} from '../slugs';

export class MdxFilesystem<T> {
  async getPageData
    <R extends 'tree' | 'array' = 'tree'>(
      args?: IPageDataOpts<R>
    ): Promise<Expand<IPageData<T, R>>>;

  async getPageData
    <R extends 'tree' | 'array' = 'tree'>(
      args?:IPageDataOpts<R>,
  ) {
      const options = args?.options;
      const returnType = options?.returnType ? options.returnType : 'tree';
      const shallow = options?.shallow === true ? true : false;
      const reSortArray = options?.reSortArray === false ? false : true;

      const slug = args?.slugArray ? slugArrayToString(args.slugArray) : '';
      const {pathType, fullPath} = getPathEntry(slug);

      if (pathType === 'dir') {
        const result = returnType === 'tree' ? {
          isDirectory: true,
          directory: {
            data: getDirectoryTree<T>(fullPath, shallow),
          },
        } : {
          isDirectory: true,
          directory: {
            data: getDirectoryArray<T>(fullPath, shallow, reSortArray),
          },
        };
        return result as Expand<IPageData<T, R>>;
      } else if (pathType === 'mdx') {
        return {
          isDirectory: false,
          mdxArticle: getBlogPostData<T>(fullPath, true),
        };
      }
    }

  getSlugs(): Expand<IStaticPath>[];
  getSlugs() {
    const {directories, mdxArticles} = getAllSlugs();

    return [...directories, ...mdxArticles];
  };
}
