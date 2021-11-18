import path from 'path';


import {
  DirectoryData,
  MdxArticleData,
  PageData,
  DirectoryTree,
  IConfig,
  Expand,
} from '../interface';

// import { slugArrayToString } from '../path';
import { getDirectoryTree } from '../tree';
import { getDirectoryArray } from '../array';
import { getBlogPostData } from '../data';
import { slugArrayToString, slugIsDirOrMdx } from '../path';

const {
  POSTS_DIR,
} = {
  POSTS_DIR: path.resolve(process.cwd(), 'posts-mdx'),
};

export class Recussion<T> {
  getPageData<R extends 'tree' | 'array' = 'tree'>(args?: {
    slugArray?: string[],
    options?: {
      dirReturnType?: R,
      shallow?: boolean,
      reSortArray?: boolean,
    },
  }): Promise<Expand<PageData<T, R>>>;
  async getPageData<R extends 'tree' | 'array' = 'tree'>(args?: {
    slugArray?: string[],
    options?: {
      dirReturnType?: R,
      shallow?: boolean,
      reSortArray?: boolean,
    },
  }) {
    const dirReturnType = args?.options?.dirReturnType || 'tree';
    const shallow = args?.options?.shallow ? args.options.shallow : false;
    const reSortArray = args?.options?.reSortArray ? args.options.reSortArray : true;

    const slug = args?.slugArray ? slugArrayToString(args.slugArray) : '';
    const {type, fullPath} = slugIsDirOrMdx(slug);

    if (type === 'dir') {
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
    } else if (type === 'mdx') {
      return {
        isDirectory: false,
        article: getBlogPostData<T>(fullPath, true),
      }
    }

    new Error(`Error in getPageData, slugPath gave neither a valid directory or a valid *.mdx file: ${slug}`)
  }
}
