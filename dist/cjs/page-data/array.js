"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tree_1 = __importDefault(require("./tree"));
const config_1 = require("../config");
const sort_1 = require("./sort");
function getDirectoryArray(cwd, shallow = false, reSortArr = true) {
    cwd = cwd || config_1.POSTS_DIR;
    const dirTree = (0, tree_1.default)(cwd, shallow);
    const dirArr = getDirectoryArrayFromTree(dirTree);
    if (reSortArr) {
        return (0, sort_1.sortDirsByTitle)(dirArr);
    }
    else {
        return dirArr;
    }
}
exports.default = getDirectoryArray;
function getDirectoryArrayFromTree(dirTree, dirArray) {
    const { dirName, dirMtimeDate, dirMetadata, directories, mdxFiles, } = dirTree;
    dirArray = dirArray || [];
    dirArray.push({
        dirName,
        dirMtimeDate,
        dirMetadata,
        mdxFiles,
    });
    directories.forEach((nextDirTree) => {
        getDirectoryArrayFromTree(nextDirTree, dirArray);
    });
    return dirArray;
}
