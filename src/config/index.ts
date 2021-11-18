// import { getPath } from '../path';
import path from 'path';
import fs from 'fs';
import {
  IConfig,
} from '../interface';
import {merge} from '@corex/deepmerge';

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

const defaultConfig: Partial<IConfig> = {
  postsDir: getPath('posts-mdx'),
  excludedProdDirs: [],
  dirIndexFile: 'index.yaml',
};


const updateConfig = (
    currConfig: Partial<IConfig>,
    newConfig: Partial<IConfig>,
): IConfig => {
  return merge([currConfig, newConfig], {
    arrayMergeType: 'overwrite',
  }) as IConfig;
};

const withDefaultConfig = (config: Partial<IConfig>): IConfig => {
  return updateConfig(defaultConfig, config);
};

const loadConfig = (path: string): IConfig => {
  const baseConfig = loadFile<IConfig>(path);
  const fullPathPostsDir = baseConfig?.postsDir ?
    getPath(baseConfig.postsDir) :
    defaultConfig.postsDir;
  const userConfig: Partial<IConfig> = {
    ...baseConfig,
    postsDir: fullPathPostsDir,
  };
  return withDefaultConfig(userConfig!);
};

const config = loadConfig(getPath('recussion-config.js'));

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
