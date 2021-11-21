import path from 'path';
import fs from 'fs';

import {
  POSTS_DIR,
  DIR_INDEX_FILE,
  EXCLUDED_PROD_DIRS,
} from '../config/index.js';

// export const getPath = (...pathSegment: string[]): string => {
//   return path.resolve(process.cwd(), ...pathSegment);
// };

export const getFullPathFromSlug = (slug: string): string => {
  slug = slug.charAt(0) === path.sep ? slug.substr(1) : slug;
  return path.resolve(POSTS_DIR, slug);
};

export function slugToArray(slug: string): string[] {
  const slugArr = slug.replace(/^\//, '').split(path.sep);
  return slugArr;
}

export function slugArrayToString(slug: string[]): string {
  return path.join(...slug);
}

export function getFileName(fullPath: string): string {
  return path.basename(fullPath);
}

export function getDirIndex(dirPath: string): string {
  return path.join(dirPath, DIR_INDEX_FILE);
}

export function getSlugFromFullPath(fullPath: string): string {
  return fullPath
      .replace(POSTS_DIR, '')
      .replace(path.sep, '/')
      .replace('.mdx', '');
}

export function getDirentData(cwd: string, dirent: fs.Dirent) {
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
}
