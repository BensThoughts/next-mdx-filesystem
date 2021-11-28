"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathData = exports.getFullPathFromSlug = exports.getSlugFromFullPath = exports.slugArrayToFullPath = exports.slugToArray = exports.getDirIndex = exports.getFileName = void 0;
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const getFileName = (fullPath) => {
    return path_1.default.basename(fullPath);
};
exports.getFileName = getFileName;
const getDirIndex = (dirPath) => {
    return path_1.default.join(dirPath, config_1.DIR_INDEX_FILE);
};
exports.getDirIndex = getDirIndex;
const slugToArray = (slug) => {
    const slugArr = slug.split('/');
    return slugArr;
};
exports.slugToArray = slugToArray;
const slugArrayToFullPath = (slugArr) => {
    const slug = path_1.default.join(...slugArr);
    return (0, exports.getFullPathFromSlug)(slug);
};
exports.slugArrayToFullPath = slugArrayToFullPath;
const getSlugFromFullPath = (fullPath) => {
    let slug = fullPath
        .replace(config_1.POSTS_DIR, '')
        .replace(/\\/g, '/')
        .replace('.mdx', '');
    slug = slug.charAt(0) === '/' ? slug.substr(1) : slug;
    return slug;
};
exports.getSlugFromFullPath = getSlugFromFullPath;
const getFullPathFromSlug = (slug) => {
    if (slug.charAt(0) === '/') {
        throw new Error(`slug started with /, this is not a proper slug, ${slug}`);
    }
    return path_1.default.resolve(config_1.POSTS_DIR, slug);
};
exports.getFullPathFromSlug = getFullPathFromSlug;
const getPathData = (cwd, dirent) => {
    const fullPath = path_1.default.join(cwd, dirent.name);
    const slug = (0, exports.getSlugFromFullPath)(fullPath);
    const isMdx = path_1.default.extname(fullPath) === '.mdx';
    const isDirectory = dirent.isDirectory();
    const excludedRoutes = process.env.NODE_ENV === 'production' ? config_1.EXCLUDED_PROD_DIRS : [];
    const isExcludedPath = excludedRoutes.includes(dirent.name);
    return {
        fullPath,
        slug,
        isMdx,
        isDirectory,
        isExcludedPath,
    };
};
exports.getPathData = getPathData;
