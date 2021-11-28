"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MdxFilesystem = void 0;
const path_1 = require("../path");
const file_1 = require("../file");
const page_data_1 = require("../page-data");
const slugs_1 = __importDefault(require("../slugs"));
class MdxFilesystem {
    getPageData(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const dirOptions = args === null || args === void 0 ? void 0 : args.dirOptions;
            const returnType = (dirOptions === null || dirOptions === void 0 ? void 0 : dirOptions.returnType) || 'tree';
            const shallow = (dirOptions === null || dirOptions === void 0 ? void 0 : dirOptions.shallow) === true ? true : false;
            const reSortArray = (dirOptions === null || dirOptions === void 0 ? void 0 : dirOptions.reSortArray) === false ? false : true;
            const slugArr = (args === null || args === void 0 ? void 0 : args.slugArray) || [];
            const dirPath = (0, path_1.slugArrayToFullPath)(slugArr);
            // const dirPath = args?.slugArray ? slugArrayToPath(args.slugArray) : '';
            // const dirPath = getFullPathFromSlug(slug);
            const dirPathExists = (0, file_1.doesPathExist)(dirPath);
            if (dirPathExists && (0, file_1.isPathDir)(dirPath)) {
                const result = returnType === 'tree' ? {
                    isDirectory: true,
                    directory: (0, page_data_1.getDirectoryTree)(dirPath, shallow),
                } : {
                    isDirectory: true,
                    directory: (0, page_data_1.getDirectoryArray)(dirPath, shallow, reSortArray),
                };
                return result;
            }
            const mdxPath = `${dirPath}.mdx`;
            const mdxPathExists = (0, file_1.doesPathExist)(mdxPath);
            if (mdxPathExists && (0, file_1.isPathFile)(mdxPath)) {
                return {
                    isDirectory: false,
                    mdxFile: (0, page_data_1.getMdxData)(mdxPath, true),
                };
            }
            throw Error(`Error, slug lead to neither a directory or .mdx file.
           Path checked: ${dirPath}
           Check your mdx-filesystem.config.json file to make sure it
           points to the directory that contains your mdx files.`);
        });
    }
    getSlugs() {
        const { directories, mdxFiles } = (0, slugs_1.default)();
        return [...directories, ...mdxFiles];
    }
    ;
}
exports.MdxFilesystem = MdxFilesystem;
