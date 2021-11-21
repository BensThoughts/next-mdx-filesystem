import path from 'path';
import {Dirent} from 'fs';

import {
  POSTS_DIR,
  DIR_INDEX_FILE,
  EXCLUDED_PROD_DIRS,
} from '../config/index.js';

export const getFullPathFromSlug = (slug: string): string => {
  slug = slug.charAt(0) === path.sep ? slug.substr(1) : slug;
  return path.resolve(POSTS_DIR, slug);
};

export const slugToArray = (slug: string): string[] => {
  const slugArr = slug.replace(/^\//, '').split(path.sep);
  return slugArr;
};

export const slugArrayToString = (slug: string[]): string => {
  return path.join(...slug);
};

export const getFileName = (fullPath: string): string => {
  return path.basename(fullPath);
};

export const getDirIndex = (dirPath: string): string => {
  return path.join(dirPath, DIR_INDEX_FILE);
};

export const getSlugFromFullPath = (fullPath: string): string => {
  return fullPath
      .replace(POSTS_DIR, '')
      .replace(path.sep, '/')
      .replace('.mdx', '');
};

export const getDirentData = (cwd: string, dirent: Dirent) => {
  const fullPath = path.join(cwd, dirent.name);
  const isMdx = path.extname(fullPath) === '.mdx';
  const isDirectory = dirent.isDirectory();
  const excludedRoutes =
    process.env.NODE_ENV === 'production' ? EXCLUDED_PROD_DIRS : [];
  const isExcludedPath = excludedRoutes.includes(dirent.name);
  return {
    fullPath,
    isMdx,
    isDirectory,
    isExcludedPath,
  };
};
