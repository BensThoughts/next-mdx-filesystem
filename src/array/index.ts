// import path from 'path';

import {
  IDirectoryData,
  DirectoryTree,
} from '../interface';
import { getPath } from '../path';

import {
  getDirectoryTree
} from '../tree';

import { POSTS_DIR } from '../config';

/**
 * Directory Array functions to turn Directory Tree into an array
 */

 export function getDirectoryArray<T>(cwd?: string, shallow = false, reSortArr = true) {
  cwd = cwd || POSTS_DIR;
  const dirTree = getDirectoryTree<T>(cwd, shallow);
  const dirArr = getDirectoryArrayFromTree<T>(dirTree);
  if (reSortArr) {
    return dirArr.sort((a, b) => (a.dirMetadata.title > b.dirMetadata.title) ? 1 : -1);
  } else {
    return dirArr;
  }
}


function getDirectoryArrayFromTree<T>(
    dirTree: DirectoryTree<T>,
    dirArray?: IDirectoryData<T>[]
): IDirectoryData<T>[] {
  const {dirName, dirMtimeDate, dirMetadata, directories, mdxArticles} = dirTree;
  dirArray = dirArray || [];
  dirArray.push(
      {
        dirName,
        dirMtimeDate,
        dirMetadata,
        mdxArticles,
      }
  );
  directories.forEach((nextDirTree) => {
    getDirectoryArrayFromTree(nextDirTree, dirArray);
  });

  return dirArray;
}