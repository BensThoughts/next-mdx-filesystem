// import { getPath } from '../path';
import path from 'path';
import fs from 'fs';
import {
  GlobalConfig,
} from '../interface';

const loadConfigFile = <T>(path: string, throwError = true): T | undefined => {
  if (fs.existsSync(path)) {
    const config = fs.readFileSync(path, 'utf-8');
    const userConfig = JSON.parse(config) as T;
    return userConfig;
  }

  if (throwError) {
    new Error(`${path} does not exist.`);
  }
};


const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment);
};

const defaultConfig: GlobalConfig = {
  'postsDir': getPath('mdx-posts'),
  'excludedProdDirs': [],
  'dirIndexFile': 'index.yaml',
};


const updateConfig = (
    userConfig: Partial<GlobalConfig>,
): GlobalConfig => {
  if (userConfig) {
    return {...defaultConfig, ...userConfig};
  }
  return defaultConfig;
};

const loadConfig = (path: string): GlobalConfig => {
  const baseConfig = loadConfigFile<Partial<GlobalConfig>>(path, false);
  const fullPathPostsDir = baseConfig?.postsDir ?
    getPath(baseConfig.postsDir) :
    defaultConfig.postsDir;
  const userConfig: Partial<GlobalConfig> = {
    ...baseConfig,
    postsDir: fullPathPostsDir,
  };
  return updateConfig(userConfig);
};

const configPath = process.env.MDX_FILESYSTEM_CONFIG_PATH ?
    process.env.MDX_FILESYSTEM_CONFIG_PATH :
    'mdx-filesystem.config.json';

const config = loadConfig(getPath(configPath));

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
