// import { getPath } from '../path';
import path from 'path';
import fs from 'fs';
import {
  IConfig,
} from '../interface.js';

const loadFile = <T>(path: string, throwError = true): T | undefined => {
  if (fs.existsSync(path)) {
    return require(path) as T;
  }

  if (throwError) {
    new Error(`${path} does not exist.`);
  }
};


const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment);
};

const defaultConfig: IConfig = {
  'postsDir': getPath('mdx-posts'),
  'excludedProdDirs': [],
  'dirIndexFile': 'index.yaml',
};


const updateConfig = (
    userConfig: Partial<IConfig>,
): IConfig => {
  if (userConfig) {
    return {...defaultConfig, ...userConfig};
  }
  return defaultConfig;
};

const loadConfig = (path: string): IConfig => {
  const baseConfig = loadFile<Partial<IConfig>>(path, false);
  const fullPathPostsDir = baseConfig?.postsDir ?
    getPath(baseConfig.postsDir) :
    defaultConfig.postsDir;
  const userConfig: Partial<IConfig> = {
    ...baseConfig,
    postsDir: fullPathPostsDir,
  };
  return updateConfig(userConfig!);
};

const config = loadConfig(getPath('mdx-filesystem-config.cjs'));

const productionConfig = {
  POSTS_DIR: config.postsDir,
  EXCLUDED_PROD_DIRS: config.excludedProdDirs,
  DIR_INDEX_FILE: config.dirIndexFile,
};

export const {
  POSTS_DIR,
  EXCLUDED_PROD_DIRS,
  DIR_INDEX_FILE,
} = productionConfig;
