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

export const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment);
};

const defaultConfig: GlobalConfig = {
  'postsDir': 'mdx-posts',
  'excludedProdDirs': [],
  'dirIndexFile': 'index.yaml',
};

export function loadConfigFile(
    path: string,
): Partial<GlobalConfig> {
  if (fs.existsSync(path)) {
    const config = fs.readFileSync(path, 'utf-8');
    const userConfig = JSON.parse(config);
    return userConfig;
  }
  return {};
};

export function loadConfig(configPath: string): GlobalConfig {
  const baseUserConfig = loadConfigFile(configPath);
  const fullPathPostsDir = baseUserConfig.postsDir ?
      getPath(baseUserConfig.postsDir) :
      getPath(defaultConfig.postsDir);
  const userConfig = {
    ...baseUserConfig,
    postsDir: fullPathPostsDir,
  };
  return {
    ...defaultConfig,
    ...userConfig,
  };
};

export function getConfigPath(): string {
  return process.env.MDX_FILESYSTEM_CONFIG_PATH ?
  getPath(process.env.MDX_FILESYSTEM_CONFIG_PATH) :
  getPath('mdx-filesystem.config.json');
}

const config = loadConfig(getConfigPath());

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
