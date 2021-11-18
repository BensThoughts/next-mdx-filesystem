import path from 'path'
import fs from 'fs';

const {
  POSTS_DIR,
} = {
  POSTS_DIR: path.resolve(process.cwd(), 'posts-mdx'),
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

export function slugPathToArray(slugPath: string) {
  const slugArr = slugPath.replace(/^\//, '').split(path.sep);
  return slugArr;
  // const slugPath = path.parse(slugString);
  // console.log(JSON.stringify(slugPath));
  // if (slugPath.dir === '') {
  //   return [slugPath.name];
  // } else {
  //   return [...slugPath.dir.split(path.sep), slugPath.name];
  // }
}

export function slugArrayToString(slugPath: string[]) {
  return path.join(...slugPath);
}

export function getFileName(fullPath: string) {
  return path.basename(fullPath);
}

export function getSlugPath(fullPath: string) {
  return fullPath.replace(POSTS_DIR, '').replace('.mdx', '');
}
