import {
  PageData,
  Expand,
} from '../interface';

import { getDirectoryTree } from '../tree';
import { getDirectoryArray } from '../array';
import { getBlogPostData } from '../data';
import {
  slugArrayToString,
  slugToFullPath,
} from '../path';

interface RecussionOpts<R extends 'tree' | 'array'> {
  slugArray?: string[],
  options?: {
    dirReturnType?: R,
    shallow?: boolean,
    reSortArray?: boolean,
  },
}

export class Recussion<T> {
  getPageData<R extends 'tree' | 'array' = 'tree'>(args?: RecussionOpts<R>): Promise<Expand<PageData<T, R>>>;
  async getPageData<R extends 'tree' | 'array' = 'tree'>(args?:RecussionOpts<R>) {
    const options = args?.options;
    const dirReturnType = options?.dirReturnType ? options.dirReturnType : 'tree';
    const shallow = options?.shallow === true ? true : false;
    const reSortArray = options?.reSortArray === false ? false : true;
  
    const slug = args?.slugArray ? slugArrayToString(args.slugArray) : '';
    const {pathType, fullPath} = slugToFullPath(slug);

    if (pathType === 'dir') {
      const result = dirReturnType === 'tree' ? {
        isDirectory: true,
        directory: {
          data: getDirectoryTree<T>(fullPath, shallow),
        },
      } as PageData<T, R> : {
        isDirectory: true,
        directory: {
          data: getDirectoryArray<T>(fullPath, shallow, reSortArray),
        },
      } as PageData<T, R>;
      return result;
    } else if (pathType === 'mdx') {
      return {
        isDirectory: false,
        article: getBlogPostData<T>(fullPath, true),
      } as PageData<T, R>;
    }

    new Error(`Error in getPageData, slugPath gave neither a valid directory or a valid *.mdx file: ${slug}`)
  }
}
