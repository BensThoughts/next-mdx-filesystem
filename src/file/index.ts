import fs from 'fs';
import path from 'path';

const {
  EXCLUDED_PROD_DIRS,
} = {
  EXCLUDED_PROD_DIRS: [''],
};


export const loadFile = <T>(path: string, throwError = true): T | undefined => {
  if (fs.existsSync(path)) {
    return require(path) as T
  }

  if (throwError) {
    new Error(`${path} does not exist.`)
  }
}

export const readFile = (path: string): string => {
  return fs.readFileSync(path, 'utf-8');
}

export const doesFileExist = (path: string): boolean => {
  return fs.existsSync(path);
}

export function getFileModifiedDate(path: string) {
  const fullDate = fs.statSync(path).mtime;
  const date = `${fullDate.getUTCFullYear()}-${fullDate.getUTCMonth() + 1}-${fullDate.getUTCDate()}`;
  return date;
}

export function readDir(dir: string) {
  return fs.readdirSync(dir, {withFileTypes: true});
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
