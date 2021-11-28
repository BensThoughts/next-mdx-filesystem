"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.getFileModifiedDate = exports.isPathFile = exports.isPathDir = exports.doesPathExist = exports.readFile = exports.readDir = void 0;
const fs_1 = __importDefault(require("fs"));
const readDir = (dir) => {
    return fs_1.default.readdirSync(dir, { withFileTypes: true });
};
exports.readDir = readDir;
const readFile = (path) => {
    return fs_1.default.readFileSync(path, 'utf-8');
};
exports.readFile = readFile;
const doesPathExist = (path) => {
    return fs_1.default.existsSync(path);
};
exports.doesPathExist = doesPathExist;
const isPathDir = (path) => {
    return fs_1.default.statSync(path).isDirectory();
};
exports.isPathDir = isPathDir;
const isPathFile = (path) => {
    return fs_1.default.statSync(path).isFile();
};
exports.isPathFile = isPathFile;
const getFileModifiedDate = (path) => {
    const date = fs_1.default.statSync(path).mtime;
    return (0, exports.formatDate)(date);
};
exports.getFileModifiedDate = getFileModifiedDate;
const formatDate = (date) => {
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}` +
        `-${date.getUTCDate()}`;
};
exports.formatDate = formatDate;
