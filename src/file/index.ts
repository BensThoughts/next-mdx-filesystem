import fs from 'fs';
import path from 'path';

const {
  EXCLUDED_PROD_DIRS,
  DIR_INDEX_FILE,
  POSTS_DIR,
} = {
  POSTS_DIR: './',
  EXCLUDED_PROD_DIRS: [''],
  DIR_INDEX_FILE: 'index.yaml',
};


export const loadFile = <T>(path: string, throwError = true): T | undefined => {
  if (fs.existsSync(path)) {
    return require(path) as T
  }

  if (throwError) {
    new Error(`${path} does not exist.`)
  }
}

export function getFileModifiedDate(path: fs.PathLike) {
  try {
    const fullDate = fs.statSync(path).mtime;
    const date = `${fullDate.getUTCFullYear()}-${fullDate.getUTCMonth() + 1}-${fullDate.getUTCDate()}`;
    return date;
  } catch (e) {
    throw new Error('Error in getFileModifiedDate, failed to access ' + path + ':' + e);
  }
}

export function getDirentData(cwd: string, dirent: fs.Dirent) {
  const fullPath = path.join(cwd, dirent.name);
  // const slugPath = getFileSlug(fullPath);
  const isMdx = path.extname(fullPath) === '.mdx';
  const isDirectory = dirent.isDirectory();
  const excludedRoutes = process.env.NODE_ENV === 'production' ? EXCLUDED_PROD_DIRS : [];
  const isExcludedPath = excludedRoutes.includes(dirent.name);
  return {
    fullPath,
    // slugPath,
    isMdx,
    isDirectory,
    isExcludedPath,
  };
}
