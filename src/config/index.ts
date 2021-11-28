// import { getPath } from '../path';
import path from 'path';
import fs from 'fs';
import {
  GlobalConfig,
} from '../interface';

/**
 * Notice: importing any project modules into the config module causes webpack
 * errors.
 */

const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment);
};

const defaultConfig: GlobalConfig = {
  'postsDir': getPath('mdx-posts'),
  'excludedProdDirs': [],
  'dirIndexFile': 'index.yaml',
};

export function loadConfigFile<T>(
    path: string,
): T | undefined {
  if (fs.existsSync(path)) {
    const config = fs.readFileSync(path, 'utf-8');
    const userConfig = JSON.parse(config) as T;
    return userConfig;
  }
  return undefined;
};

export function loadConfig(configPath: string): GlobalConfig {
  const baseUserConfig =
    loadConfigFile<Partial<GlobalConfig>>(configPath);
  if (baseUserConfig) {
    const fullPathPostsDir = baseUserConfig.postsDir ?
      getPath(baseUserConfig.postsDir) :
      defaultConfig.postsDir;
    const userConfig: Partial<GlobalConfig> = {
      ...baseUserConfig,
      postsDir: fullPathPostsDir,
    };
    return {
      ...defaultConfig,
      ...userConfig,
    };
  } else {
    return defaultConfig;
  }
};

export const configPath = process.env.MDX_FILESYSTEM_CONFIG_PATH ?
  getPath(process.env.MDX_FILESYSTEM_CONFIG_PATH) :
  getPath('mdx-filesystem.config.json');

const config = loadConfig(configPath);

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
