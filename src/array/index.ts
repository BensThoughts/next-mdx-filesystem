import {
  DirectoryData,
  DirectoryTree,
} from '../interface.js';

import {
  getDirectoryTree,
} from '../tree/index.js';

import {POSTS_DIR} from '../config/index.js';

export function getDirectoryArray<T>(
    cwd?: string,
    shallow = false,
    reSortArr = true,
) {
  cwd = cwd || POSTS_DIR;
  const dirTree = getDirectoryTree<T>(cwd, shallow);
  const dirArr = getDirectoryArrayFromTree<T>(dirTree);
  if (reSortArr) {
    return dirArr
        .sort((a, b) => (a.dirMetadata.title > b.dirMetadata.title) ? 1 : -1);
  } else {
    return dirArr;
  }
}


function getDirectoryArrayFromTree<T>(
    dirTree: DirectoryTree<T>,
    dirArray?: DirectoryData<T>[],
): DirectoryData<T>[] {
  const {
    dirName,
    dirMtimeDate,
    dirMetadata,
    directories,
    mdxArticles,
  } = dirTree;
  dirArray = dirArray || [];
  dirArray.push({
    dirName,
    dirMtimeDate,
    dirMetadata,
    mdxArticles,
  });
  directories.forEach((nextDirTree) => {
    getDirectoryArrayFromTree(nextDirTree, dirArray);
  });

  return dirArray;
}
