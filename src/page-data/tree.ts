import {DirectoryTree} from '../interface.js';

import {
  getFileModifiedDate,
  readDir,
} from '../file/index.js';

import {
  getMdxData,
  getDirectoryMetadata,
} from './metadata';

import {
  getFileName,
  getFullPathFromSlug,
  getPathData,
} from '../path/index.js';

import {
  POSTS_DIR,
} from '../config/index.js';

function getDirectoryTreeNode<T>(cwd: string): DirectoryTree<T> {
  const dirData: DirectoryTree<T> = {
    dirName: getFileName(cwd),
    dirMtimeDate: getFileModifiedDate(cwd),
    dirMetadata: getDirectoryMetadata(cwd),
    mdxArticles: [],
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
          mdxArticles: [],
        });
      } else if (!isDirectory && isMdx) {
        const mdxArticleData = getMdxData<T>(fullPath, false);
        dirData.mdxArticles.push(mdxArticleData);
      };
    });
  } catch (e) {
    console.error(`There was an error reading from ${cwd}: ${e}`);
  }

  dirData.directories
      .sort((a, b) => (a.dirMetadata.title < b.dirMetadata.title) ? 1 : -1);
  dirData.mdxArticles
      .sort((a, b) => (a.metadata.date < b.metadata.date) ? 1 : -1);

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
    mdxArticles: [],
  };
  const newDirectoryData = getDirectoryTreeNode<T>(cwd);
  directoryData.directories.push(...newDirectoryData.directories);
  directoryData.mdxArticles.push(...newDirectoryData.mdxArticles);
  if (!shallow) {
    directoryData.directories.forEach((directory) => {
      const newCwd = getFullPathFromSlug(directory.dirMetadata.slug);
      getDirectoryTree(newCwd, shallow, directory);
    });
  }
  return directoryData;
}
