import {DirectoryTree} from '../interface';

import {
  getFileModifiedDate,
  readDir,
} from '../file';

import {
  getFileName,
  getFullPathFromSlug,
  getPathData,
} from '../path';

import {
  POSTS_DIR,
} from '../config';

import getMdxData from './mdx-data';
import getDirectoryMetadata from './dir-data';
import {sortDirsByTitle, sortMdxFilesByDate} from './sort';

function getDirectoryTreeNode<T>(cwd: string): DirectoryTree<T> {
  const dirData: DirectoryTree<T> = {
    dirName: getFileName(cwd),
    dirMtimeDate: getFileModifiedDate(cwd),
    dirMetadata: getDirectoryMetadata(cwd),
    mdxFiles: [],
    directories: [],
  };
  try {
    const dirents = readDir(cwd);
    dirents.forEach((dirent) => {
      const {
        isMdx,
        isDirectory,
        isExcludedPath,
        fullPath,
        slug,
      } = getPathData(cwd, dirent);
      if (isDirectory && !isExcludedPath) {
        const {
          title,
          date,
          description,
        } = getDirectoryMetadata(fullPath);
        const dirMtimeDate = getFileModifiedDate(fullPath);
        dirData.directories.push({
          dirName: getFileName(fullPath),
          dirMtimeDate,
          dirMetadata: {
            title,
            date,
            slug,
            description,
          },
          directories: [],
          mdxFiles: [],
        });
      } else if (!isDirectory && isMdx) {
        const mdxFileData = getMdxData<T>(fullPath, false);
        dirData.mdxFiles.push(mdxFileData);
      };
    });
  } catch (e) {
    console.error(`There was an error reading from ${cwd}: ${e}`);
  }

  sortDirsByTitle(dirData.directories);
  sortMdxFilesByDate(dirData.mdxFiles);

  return dirData;
}

export default function getDirectoryTree<T>(
    cwd?: string,
    shallow = false,
    directoryData?: DirectoryTree<T>,
): DirectoryTree<T> {
  cwd = cwd || POSTS_DIR as string;
  directoryData = directoryData || {
    dirName: getFileName(cwd),
    dirMtimeDate: getFileModifiedDate(cwd),
    dirMetadata: getDirectoryMetadata(cwd),
    directories: [],
    mdxFiles: [],
  };
  const newDirectoryData = getDirectoryTreeNode<T>(cwd);
  directoryData.directories.push(...newDirectoryData.directories);
  directoryData.mdxFiles.push(...newDirectoryData.mdxFiles);
  if (!shallow) {
    directoryData.directories.forEach((directory) => {
      const newCwd = getFullPathFromSlug(directory.dirMetadata.slug);
      getDirectoryTree(newCwd, shallow, directory);
    });
  }
  return directoryData;
}
