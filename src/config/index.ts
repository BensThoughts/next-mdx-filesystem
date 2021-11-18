// import { getPath } from '../path';
import path from 'path';
import fs from 'fs';
import {
  IConfig,
} from '../interface';
import {merge} from '@corex/deepmerge';
// import { loadFile } from '../file';

export const loadFile = <T>(path: string, throwError = true): T | undefined => {
  if (fs.existsSync(path)) {
    return require(path) as T
  }

  if (throwError) {
    new Error(`${path} does not exist.`)
  }
}



export const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment)
}

const defaultConfig: Partial<IConfig> = {
  POSTS_DIR: getPath('posts-mdx'),
  EXCLUDED_PROD_DIRS: [],
  DIR_INDEX_FILE: 'index.yaml',
}


const updateConfig = (
  currConfig: Partial<IConfig>,
  newConfig: Partial<IConfig>
): IConfig => {
  const config = merge([currConfig, newConfig], {
    arrayMergeType: 'overwrite',
  }) as IConfig;
  console.log(JSON.stringify(config));
  return config;
}

const withDefaultConfig = (config: Partial<IConfig>): IConfig => {
  return updateConfig(defaultConfig, config)
}

const loadConfig = (path: string): IConfig => {
  const baseConfig = loadFile<IConfig>(path);
  const userConfig: Partial<IConfig> = {
    ...baseConfig,
    POSTS_DIR: baseConfig?.POSTS_DIR ? getPath(baseConfig.POSTS_DIR) : defaultConfig.POSTS_DIR,
  }
  return withDefaultConfig(userConfig!)
}

const config = loadConfig(getPath('recussion-config.js'));

export const {
  POSTS_DIR,
  EXCLUDED_PROD_DIRS,
  DIR_INDEX_FILE,
} = config;
