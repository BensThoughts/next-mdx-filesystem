/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
import {
  // loadConfigFile,
  loadConfig,
  getConfigPath,
} from '..';

import path from 'path';

describe('getConfigPath', () => {
  test.concurrent('should return default when ENV is not set', () => {
    const tempEnv = process.env.MDX_FILESYSTEM_CONFIG_PATH;
    delete process.env.MDX_FILESYSTEM_CONFIG_PATH;
    expect(path.basename(getConfigPath())).toBe('mdx-filesystem.config.json');
    process.env.MDX_FILESYSTEM_CONFIG_PATH = tempEnv;
  });
});


describe('loadConfig', () => {
  test.concurrent('should return a user config when config file exists', () => {
    const config = loadConfig(getConfigPath());
    expect(config.dirIndexFile).toBe('index.yaml');
    expect(config.excludedProdDirs).toStrictEqual(['drafts']);
  });
  test.concurrent('should return a default config when config path does not exist', () => {
    const config = loadConfig('badPath');
    expect(config.dirIndexFile).toBe('index.yaml');
    expect(config.excludedProdDirs).toStrictEqual([]);
  });
});
