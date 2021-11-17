import fs from 'fs';
import path from 'path';


import {
  DirectoryData,
  MdxArticleData,
  PageData,
  DirectoryTree,
  IConfig,
  Expand,
} from '../interface';

import { slugArrayToString } from '../path';
import { getDirectoryTree } from '../tree';
import { getDirectoryArray } from '../array';
import { getBlogPostData } from '../data';

const {
  EXCLUDED_PROD_DIRS,
  DIR_INDEX_FILE,
  POSTS_DIR,
} = {
  POSTS_DIR: './',
  EXCLUDED_PROD_DIRS: [''],
  DIR_INDEX_FILE: 'index.yaml',
};

export class Recussion<T> {
  async getPageData<R extends 'tree' | 'array' = 'tree'>(args?: {
    slugArray?: string[],
    options?: {
      dirReturnType?: R,
      shallow?: boolean,
      reSortArray?: boolean,
    },
  }): Promise<Expand<PageData<T, R>>> {
    const dirReturnType = args?.options?.dirReturnType || 'tree';
    const shallow = args?.options?.shallow ? args.options.shallow : false;
    const reSortArray = args?.options?.reSortArray ? args.options.reSortArray : true;


    const slug = args?.slugArray ? slugArrayToString(args.slugArray) : '';
    const cwd = path.join(POSTS_DIR, slug);

    const pathWithoutExtension = path.join(POSTS_DIR, slug);
    const pathExists = fs.existsSync(pathWithoutExtension);
    if (pathExists && fs.statSync(pathWithoutExtension).isDirectory()) {
      if (dirReturnType === 'tree') {
        return {
          isDirectory: true,
          directory: {
            data: getDirectoryTree<T>(cwd, shallow),
          },
        } as any;
      } else {
        return {
          isDirectory: true,
          directory: {
            data: getDirectoryArray<T>(cwd, shallow, reSortArray),
          },
        } as any;
      }
    } else {
      const pathWithExtension = `${pathWithoutExtension}.mdx`;
      const mdxPathExists = fs.existsSync(pathWithExtension);
      if (mdxPathExists && fs.statSync(pathWithExtension).isFile()) {
        const mdxData = getBlogPostData<T>(pathWithExtension, true);
        return {
          isDirectory: false,
          article: mdxData,
        };
      } else {
        throw new Error(`Error in getPageData, slugPath gave neither a valid directory or a valid *.mdx file: ${slug}`);
      }
    }
  }
}
