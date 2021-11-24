import {DirectoryTree} from '../interface';

import {
  // getFileModifiedDate,
  readDir,
} from '../file';

import {
  // getFileName,
  getFullPathFromSlug,
  getPathData,
} from '../path';

import {
  POSTS_DIR,
} from '../config';

import getMdxData from './mdx-data';
// import getDirectoryMetadata from './dir-data';
import {sortDirsByTitle, sortMdxFilesByDate} from './sort';
import getDirectoryMetadata from './dir-metadata';

function getDirectoryTreeNodes<T>(
    cwd: string,
    dirTreeNode: DirectoryTree<T>,
): DirectoryTree<T> {
  const dirents = readDir(cwd);
  dirents.forEach((dirent) => {
    const {
      isMdx,
      isDirectory,
      isExcludedPath,
      fullPath,
    } = getPathData(cwd, dirent);
    if (isDirectory && !isExcludedPath) {
      dirTreeNode.directories.push({
        ...getDirectoryMetadata(fullPath),
        directories: [],
        mdxFiles: [],
      });
    } else if (!isDirectory && isMdx) {
      dirTreeNode.mdxFiles.push(getMdxData<T>(fullPath, false));
    }
  });
  sortDirsByTitle(dirTreeNode.directories);
  sortMdxFilesByDate(dirTreeNode.mdxFiles);
  return dirTreeNode;
}

export default function getDirectoryTree<T>(
    cwd?: string,
    shallow = false,
    directoryTree?: DirectoryTree<T>,
): DirectoryTree<T> {
  cwd = cwd || POSTS_DIR as string;
  directoryTree = directoryTree ||
  {
    ...getDirectoryMetadata(cwd),
    directories: [],
    mdxFiles: [],
  };

  getDirectoryTreeNodes(cwd, directoryTree);

  if (!shallow) {
    directoryTree.directories.forEach((dirTreeNode) => {
      const newCwd = getFullPathFromSlug(dirTreeNode.dirMetadata.slug);
      getDirectoryTree(newCwd, shallow, dirTreeNode);
    });
  }

  return directoryTree;
}
