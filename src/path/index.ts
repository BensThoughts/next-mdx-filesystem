import path from 'path';
import fs from 'fs';

import {
  POSTS_DIR,
  DIR_INDEX_FILE,
} from '../config/index.js';
import {PathEntry} from '../interface.js';


// export const getPath = (...pathSegment: string[]): string => {
//   return path.resolve(process.cwd(), ...pathSegment);
// };

export const getFullPathFromSlug = (slug: string): string => {
  slug = slug.charAt(0) === path.sep ? slug.substr(1) : slug;
  return path.resolve(POSTS_DIR, slug);
};

export function slugPathToArray(slugPath: string) {
  const slugArr = slugPath.replace(/^\//, '').split(path.sep);
  return slugArr;
}

export function slugArrayToString(slugPath: string[]) {
  return path.join(...slugPath);
}

export function getFileName(fullPath: string) {
  return path.basename(fullPath);
}

export function getDirIndex(dirPath: string) {
  return path.join(dirPath, DIR_INDEX_FILE);
}

export function getSlugPath(fullPath: string) {
  return fullPath.replace(POSTS_DIR, '').replace('.mdx', '');
}

export function getPathEntry(slug: string): PathEntry {
  const pathWithoutExtension = getFullPathFromSlug(slug);
  const pathExists = fs.existsSync(pathWithoutExtension);
  if (pathExists && fs.statSync(pathWithoutExtension).isDirectory()) {
    return {
      pathType: 'dir',
      fullPath: pathWithoutExtension,
    };
  }
  const pathWithExtension = `${pathWithoutExtension}.mdx`;
  const mdxPathExists = fs.existsSync(pathWithExtension);
  if (mdxPathExists && fs.statSync(pathWithExtension).isFile()) {
    return {
      pathType: 'mdx',
      fullPath: pathWithExtension,
    };
  }

  throw Error(
      `Error, slug lead to neither a directory or .mdx file.
       Path checked: ${pathWithoutExtension}
       Check your mdx-filesystem.config.js file to make sure it
       points to the directory that contains your mdx files.`,
  );
}
