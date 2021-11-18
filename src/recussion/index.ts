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
  slugToFullPath,
} from '../path';
import {getAllSlugs} from '../slugs';

export class Recussion<T> {
  async getPageData
    <R extends 'tree' | 'array' = 'tree'>(
      args?: IPageDataOpts<R>
    ): Promise<Expand<IPageData<T, R>>>;

  async getPageData
    <R extends 'tree' | 'array' = 'tree'>(args?:IPageDataOpts<R>) {
      const options = args?.options;
      const returnType = options?.returnType ? options.returnType : 'tree';
      const shallow = options?.shallow === true ? true : false;
      const reSortArray = options?.reSortArray === false ? false : true;

      const slug = args?.slugArray ? slugArrayToString(args.slugArray) : '';
      const {pathType, fullPath} = slugToFullPath(slug);

      if (pathType === 'dir') {
        const result = returnType === 'tree' ? {
          isDirectory: true,
          directory: {
            data: getDirectoryTree<T>(fullPath, shallow),
          },
        } as IPageData<T, R> : {
          isDirectory: true,
          directory: {
            data: getDirectoryArray<T>(fullPath, shallow, reSortArray),
          },
        } as IPageData<T, R>;
        return result;
      } else if (pathType === 'mdx') {
        return {
          isDirectory: false,
          article: getBlogPostData<T>(fullPath, true),
        } as IPageData<T, R>;
      }
    }

  getSlugs(): Expand<IStaticPath>[];
  getSlugs() {
    const {directories, mdxArticles} = getAllSlugs();

    return [...directories, ...mdxArticles];
  };
}
