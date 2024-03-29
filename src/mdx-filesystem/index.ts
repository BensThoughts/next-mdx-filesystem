import {
  Expand,
  PageData,
  StaticPath,
  PageDataOpts,
} from '../interface';

import {
  slugArrayToFullPath,
} from '../path';

import {
  doesPathExist,
  isPathDir,
  isPathFile,
} from '../file';

import {
  getDirectoryArray,
  getDirectoryTree,
  getMdxData,
} from '../page-data';

import getAllSlugs from '../slugs';

export class MdxFilesystem<T = {}> {
  /**
   *
   * @param {string} args.slugArray - The slug array for the current path..
   * @param {'tree' | 'array'} args.dirOptions.returnType - The return type of
   * directory when isDirectory is true. Can be 'tree' or 'array'
   * @param {boolean} args.dirOptions.shallow - true when you only want to
   * search and return data about the current directory. false when you want
   * all of the data in the sub-directories below it as well.
   * @param {boolean} args.dirOptions.reSortArray - when the returned directory
   * data is an array this states if it should be sorted alphabetically or not.
   *
   */
  async getPageData
    <R extends 'tree' | 'array' = 'tree'>(
      args?: Expand<PageDataOpts<R>>
    ): Promise<Expand<PageData<T, R>>>;

  async getPageData
    <R extends 'tree' | 'array' = 'tree'>(
      args?:Expand<PageDataOpts<R>>,
  ) {
      const dirOptions = args?.dirOptions;
      const returnType = dirOptions?.returnType || 'tree';
      const shallow = dirOptions?.shallow === true ? true : false;
      const reSortArray = dirOptions?.reSortArray === false ? false : true;

      const slugArr = args?.slugArray || [];
      const dirPath = slugArrayToFullPath(slugArr);
      // const dirPath = args?.slugArray ? slugArrayToPath(args.slugArray) : '';

      // const dirPath = getFullPathFromSlug(slug);
      const dirPathExists = doesPathExist(dirPath);
      if (dirPathExists && isPathDir(dirPath)) {
        const result = returnType === 'tree' ? {
          isDirectory: true,
          directory: getDirectoryTree<T>(dirPath, shallow),
        } : {
          isDirectory: true,
          directory: getDirectoryArray<T>(dirPath, shallow, reSortArray),
        };
        return result as Expand<PageData<T, R>>;
      }

      const mdxPath = `${dirPath}.mdx`;
      const mdxPathExists = doesPathExist(mdxPath);
      if (mdxPathExists && isPathFile(mdxPath)) {
        return {
          isDirectory: false,
          mdxFile: getMdxData<T>(mdxPath, true),
        } as Expand<PageData<T, R>>;
      }

      throw Error(
          `Error, slug lead to neither a directory or .mdx file.
           Path checked: ${dirPath}
           Check your mdx-filesystem.config.json file to make sure it
           points to the directory that contains your mdx files.`,
      );
    }

  getSlugs(): Expand<StaticPath>[];
  getSlugs() {
    const {directories, mdxFiles} = getAllSlugs();

    return [...directories, ...mdxFiles];
  };
}
