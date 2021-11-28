import { GlobalConfig } from '../interface';
/**
 * Notice: importing any project modules into the config module causes webpack
 * errors.
 */
export declare const getPath: (...pathSegment: string[]) => string;
export declare function loadConfigFile(path: string): Partial<GlobalConfig>;
export declare function loadConfig(configPath: string): GlobalConfig;
export declare function getConfigPath(): string;
export declare const POSTS_DIR: string, EXCLUDED_PROD_DIRS: string[], DIR_INDEX_FILE: string;
