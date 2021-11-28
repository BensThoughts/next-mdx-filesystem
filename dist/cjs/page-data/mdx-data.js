"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../path");
const file_1 = require("../file");
const gray_matter_1 = __importDefault(require("gray-matter"));
function getMdxData(fullPath, includeContent = true) {
    const rawFileSource = (0, file_1.readFile)(fullPath);
    const slug = (0, path_1.getSlugFromFullPath)(fullPath);
    const mtimeDate = (0, file_1.getFileModifiedDate)(fullPath);
    const fileName = (0, path_1.getFileName)(fullPath);
    const { content, data } = (0, gray_matter_1.default)(rawFileSource);
    let { date, title } = data;
    date = date || mtimeDate;
    title = title || fileName;
    return {
        fileName,
        mtimeDate,
        metadata: Object.assign(Object.assign({}, data), { date,
            title,
            slug }),
        content: includeContent ? content : null,
    };
}
exports.default = getMdxData;
