import path from 'path';

import {
  DirectoryData,
  DirectoryTree,
} from '../interface';

import {
  getDirectoryTree
} from '../tree';

const {
  POSTS_DIR,
} = {
  POSTS_DIR: path.resolve(process.cwd(), 'posts-mdx'),
};

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
    dirArray?: DirectoryData<T>[]
): DirectoryData<T>[] {
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