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

// import { slugArrayToString } from '../path';
import { getDirectoryTree } from '../tree';
import { getDirectoryArray } from '../array';
import { getBlogPostData } from '../data';
import { slugArrayToString } from '../path';

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
    const cwd = path.resolve(POSTS_DIR, slug);
    
    const pathWithoutExtension = path.join(POSTS_DIR, slug);
    const pathExists = fs.existsSync(pathWithoutExtension);
    if (pathExists && fs.statSync(pathWithoutExtension).isDirectory()) {
      if (dirReturnType === 'tree') {
        return {
          isDirectory: true,
          directory: {
            data: getDirectoryTree<T>(cwd, shallow),
          },
        };
      } else {
        return {
          isDirectory: true,
          directory: {
            data: getDirectoryArray<T>(cwd, shallow, reSortArray),
          },
        };
      }
    } else {
      const pathWithExtension = `${pathWithoutExtension}.mdx`;
      const mdxPathExists = fs.existsSync(pathWithExtension);
      if (mdxPathExists && fs.statSync(pathWithExtension).isFile()) {
        return {
          isDirectory: false,
          article: getBlogPostData<T>(pathWithExtension, true),
        };
      } else {
        throw new Error(`Error in getPageData, slugPath gave neither a valid directory or a valid *.mdx file: ${slug}`);
      }
    }
  }
}
