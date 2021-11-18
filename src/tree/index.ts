import {DirectoryTree} from '../interface';
import fs from 'fs';
import path from 'path';

import {
  getDirentData,
  getFileModifiedDate,
} from '../file';
import {
  getBlogPostData,
  getDirectoryMetadata,
} from '../data';
import { getFileName, getPath, getSlugPath } from '../path';

const {
  POSTS_DIR,
} = {
  POSTS_DIR: path.resolve(process.cwd(), 'posts-mdx'),
};

function getDirectoryTreeNode<T>(cwd: string): DirectoryTree<T> {
  const dirData: DirectoryTree<T> = {
    dirName: getFileName(cwd),
    dirMtimeDate: getFileModifiedDate(cwd),
    dirMetadata: getDirectoryMetadata(cwd),
    mdxArticles: [],
    directories: [],
  };
  try {
    const dirents = fs.readdirSync(cwd, {withFileTypes: true});
    dirents.forEach((dirent) => {
      const {
        isMdx,
        isDirectory,
        isExcludedPath,
        fullPath,
        // slugPath,
      } = getDirentData(cwd, dirent);
      const slugPath = getSlugPath(fullPath);

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
            slug: slugPath,
            description,
          },
          directories: [],
          mdxArticles: [],
        });
      } else if (!isDirectory && isMdx) {
        const mdxArticleData = getBlogPostData<T>(fullPath, false);
        dirData.mdxArticles.push(mdxArticleData);
      };
    });
  } catch (e) {
    console.error(`There was an error reading from ${cwd}: ${e}`);
  }

  dirData.directories.sort((a, b) => (a.dirMetadata.title < b.dirMetadata.title) ? 1 : -1);
  dirData.mdxArticles.sort((a, b) => (a.metadata.date < b.metadata.date) ? 1 : -1);

  return dirData;
}

export function getDirectoryTree<T>(
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
    // const newCwd = path.join(POSTS_DIR, directory.dirMetadata.slug);
    const newCwd = path.join(POSTS_DIR, directory.dirMetadata.slug);
    getDirectoryTree(newCwd, shallow, directory);
  });
}
return directoryData;
}
