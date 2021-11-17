import { getConfigFilePath } from '../path';
import {
  IConfig,
} from '../interface';
import {merge} from '@corex/deepmerge';
import { loadFile } from '../file';
// const POSTS_DIR = config.postsDirectory as string;
// const EXCLUDED_DIRS = config.excludedProdDirs as string[];
// const DIR_INDEX_FILE = 'index.yaml';



const defaultConfig: Partial<IConfig> = {
  POSTS_DIR: './',
  EXCLUDED_PROD_DIRS: [''],
  DIR_INDEX_FILE: 'index.yaml',
}



const updateConfig = (
  currConfig: Partial<IConfig>,
  newConfig: Partial<IConfig>
): IConfig => {
  return merge([currConfig, newConfig], {
    arrayMergeType: 'overwrite',
  }) as IConfig
}

const withDefaultConfig = (config: Partial<IConfig>): IConfig => {
  return updateConfig(defaultConfig, config)
}

const loadConfig = (path: string): IConfig => {
  const baseConfig = loadFile<IConfig>(path)
  return withDefaultConfig(baseConfig!)
}

const loadedConfig = loadFile<Partial<IConfig>>('./recussion-config.js', true);

const {
  POSTS_DIR,
  EXCLUDED_PROD_DIRS,
  DIR_INDEX_FILE,
} = loadConfig(getConfigFilePath());

export const config = {
  POSTS_DIR: './',
  EXCLUDED_PROD_DIRS: ['drafts'],
  DIR_INDEX_FILE: 'index.yaml',
}

// export default config;