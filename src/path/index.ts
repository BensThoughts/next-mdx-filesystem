import path from 'path'
import fs from 'fs';

const {
  EXCLUDED_PROD_DIRS,
  DIR_INDEX_FILE,
  POSTS_DIR,
} = {
  POSTS_DIR: './',
  EXCLUDED_PROD_DIRS: [''],
  DIR_INDEX_FILE: 'index.yaml',
};


export const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment)
}

export const getConfigFilePath = () => {
  const configPath = getPath('recussion-config.js')

  if (!fs.existsSync(configPath)) {
    throw new Error(`${configPath} does not exist.`)
  }

  return configPath
}

export function slugStringToArray(slugString: string) {
  const slugPath = path.parse(slugString);
  if (slugPath.dir === '') {
    return [slugPath.name];
  } else {
    return [...slugPath.dir.split(path.sep), slugPath.name];
  }
}

export function slugArrayToString(slugPath: string[]) {
  return path.join(...slugPath);
}

export function getFileName(fullPath: string) {
  return path.basename(fullPath);
}

export function getSlugPath(fullPath: string) {
  return fullPath.replace(POSTS_DIR, '').split(path.sep).join('/').replace('.mdx', '');
}
