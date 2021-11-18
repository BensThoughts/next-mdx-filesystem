import path from 'path'
import fs from 'fs';

const {
  POSTS_DIR,
  DIR_INDEX_FILE,
} = {
  POSTS_DIR: path.resolve(process.cwd(), 'posts-mdx'),
  DIR_INDEX_FILE: 'index.yaml',
};


export const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment)
}

export const getFullPathFromSlug = (slug: string): string => {
  return path.resolve(POSTS_DIR, slug);
}

export const getConfigFilePath = () => {
  const configPath = getPath('recussion-config.js')

  if (!fs.existsSync(configPath)) {
    throw new Error(`${configPath} does not exist.`)
  }

  return configPath
}

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

interface Path {
  type?: 'dir' | 'mdx';
  fullPath: string;
}

export function slugIsDirOrMdx(slug: string): Path {
  const pathWithoutExtension = getFullPathFromSlug(slug);
  const pathExists = fs.existsSync(pathWithoutExtension);
  if (pathExists && fs.statSync(pathWithoutExtension).isDirectory()) {
    return {
      type: 'dir',
      fullPath: pathWithoutExtension,
    };
  }
  const pathWithExtension = `${pathWithoutExtension}.mdx`;
  const mdxPathExists = fs.existsSync(pathWithExtension);
  if (mdxPathExists && fs.statSync(pathWithExtension).isFile()) {
    return {
      type: 'mdx',
      fullPath: pathWithExtension,
    };
  }

  return {
    type: undefined,
    fullPath: '',
  }
}
