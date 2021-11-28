"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIR_INDEX_FILE = exports.EXCLUDED_PROD_DIRS = exports.POSTS_DIR = exports.getConfigPath = exports.loadConfig = exports.loadConfigFile = exports.getPath = void 0;
// import { getPath } from '../path';
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Notice: importing any project modules into the config module causes webpack
 * errors.
 */
const getPath = (...pathSegment) => {
    return path_1.default.resolve(process.cwd(), ...pathSegment);
};
exports.getPath = getPath;
const defaultConfig = {
    'postsDir': 'mdx-posts',
    'excludedProdDirs': [],
    'dirIndexFile': 'index.yaml',
};
function loadConfigFile(path) {
    if (fs_1.default.existsSync(path)) {
        const config = fs_1.default.readFileSync(path, 'utf-8');
        const userConfig = JSON.parse(config);
        return userConfig;
    }
    return {};
}
exports.loadConfigFile = loadConfigFile;
;
function loadConfig(configPath) {
    const baseUserConfig = loadConfigFile(configPath);
    const fullPathPostsDir = baseUserConfig.postsDir ?
        (0, exports.getPath)(baseUserConfig.postsDir) :
        (0, exports.getPath)(defaultConfig.postsDir);
    const userConfig = Object.assign(Object.assign({}, baseUserConfig), { postsDir: fullPathPostsDir });
    return Object.assign(Object.assign({}, defaultConfig), userConfig);
}
exports.loadConfig = loadConfig;
;
function getConfigPath() {
    return process.env.MDX_FILESYSTEM_CONFIG_PATH ?
        (0, exports.getPath)(process.env.MDX_FILESYSTEM_CONFIG_PATH) :
        (0, exports.getPath)('mdx-filesystem.config.json');
}
exports.getConfigPath = getConfigPath;
const config = loadConfig(getConfigPath());
const productionConfig = {
    POSTS_DIR: config.postsDir,
    EXCLUDED_PROD_DIRS: config.excludedProdDirs,
    DIR_INDEX_FILE: config.dirIndexFile,
};
exports.POSTS_DIR = productionConfig.POSTS_DIR, exports.EXCLUDED_PROD_DIRS = productionConfig.EXCLUDED_PROD_DIRS, exports.DIR_INDEX_FILE = productionConfig.DIR_INDEX_FILE;
