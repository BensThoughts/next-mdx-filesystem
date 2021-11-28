/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
import {
  loadConfig,
  configPath,
} from '..';

describe('loadConfig', () => {
  test.concurrent('should return a user config when config file exists', () => {
    const config = loadConfig(configPath);
    expect(config.dirIndexFile).toBe('index.yaml');
    expect(config.excludedProdDirs).toStrictEqual(['drafts']);
  });
  test.concurrent('should return a default config when config path does not exist', () => {
    const tempEnv = process.env.MDX_FILESYSTEM_CONFIG_PATH;
    process.env.MDX_FILESYSTEM_CONFIG_PATH = 'bad.path';
    const config = loadConfig('badPath');
    expect(config.dirIndexFile).toBe('index.yaml');
    expect(config.excludedProdDirs).toStrictEqual([]);
    process.env.MDX_FILESYSTEM_CONFIG_PATH = tempEnv;
  });
});
