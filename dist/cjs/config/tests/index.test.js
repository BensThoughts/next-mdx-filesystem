"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
const __1 = require("..");
const path_1 = __importDefault(require("path"));
describe('getConfigPath', () => {
    test.concurrent('should return default when ENV is not set', () => {
        const tempEnv = process.env.MDX_FILESYSTEM_CONFIG_PATH;
        delete process.env.MDX_FILESYSTEM_CONFIG_PATH;
        expect(path_1.default.basename((0, __1.getConfigPath)())).toBe('mdx-filesystem.config.json');
        process.env.MDX_FILESYSTEM_CONFIG_PATH = tempEnv;
    });
});
describe('loadConfig', () => {
    test.concurrent('should return a user config when config file exists', () => {
        const config = (0, __1.loadConfig)((0, __1.getConfigPath)());
        expect(config.dirIndexFile).toBe('index.yaml');
        expect(config.excludedProdDirs).toStrictEqual(['drafts']);
    });
    test.concurrent('should return a default config when config path does not exist', () => {
        const config = (0, __1.loadConfig)('badPath');
        expect(config.dirIndexFile).toBe('index.yaml');
        expect(config.excludedProdDirs).toStrictEqual([]);
    });
});
