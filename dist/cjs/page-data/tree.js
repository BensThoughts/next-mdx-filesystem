"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("../file");
const path_1 = require("../path");
const config_1 = require("../config");
const mdx_data_1 = __importDefault(require("./mdx-data"));
// import getDirectoryMetadata from './dir-data';
const sort_1 = require("./sort");
const dir_metadata_1 = __importDefault(require("./dir-metadata"));
function getDirectoryTreeNodes(cwd, dirTreeNode) {
    const dirents = (0, file_1.readDir)(cwd);
    dirents.forEach((dirent) => {
        const { isMdx, isDirectory, isExcludedPath, fullPath, } = (0, path_1.getPathData)(cwd, dirent);
        if (isDirectory && !isExcludedPath) {
            dirTreeNode.directories.push(Object.assign(Object.assign({}, (0, dir_metadata_1.default)(fullPath)), { directories: [], mdxFiles: [] }));
        }
        else if (!isDirectory && isMdx) {
            dirTreeNode.mdxFiles.push((0, mdx_data_1.default)(fullPath, false));
        }
    });
    (0, sort_1.sortDirsByTitle)(dirTreeNode.directories);
    (0, sort_1.sortMdxFilesByDate)(dirTreeNode.mdxFiles);
    return dirTreeNode;
}
function getDirectoryTree(cwd, shallow = false, directoryTree) {
    cwd = cwd || config_1.POSTS_DIR;
    directoryTree = directoryTree || Object.assign(Object.assign({}, (0, dir_metadata_1.default)(cwd)), { directories: [], mdxFiles: [] });
    getDirectoryTreeNodes(cwd, directoryTree);
    if (!shallow) {
        directoryTree.directories.forEach((dirTreeNode) => {
            const newCwd = (0, path_1.getFullPathFromSlug)(dirTreeNode.dirMetadata.slug);
            getDirectoryTree(newCwd, shallow, dirTreeNode);
        });
    }
    return directoryTree;
}
exports.default = getDirectoryTree;
