"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = require("../path");
const file_1 = require("../file");
function getDirectoryMetadata(fullPath) {
    const dirName = (0, path_1.getFileName)(fullPath);
    const dirMtimeDate = (0, file_1.getFileModifiedDate)(fullPath);
    const slug = (0, path_1.getSlugFromFullPath)(fullPath);
    const indexPath = (0, path_1.getDirIndex)(fullPath);
    const indexExists = (0, file_1.doesPathExist)(indexPath);
    if (!indexExists) {
        return {
            dirName,
            dirMtimeDate,
            dirMetadata: {
                title: dirName,
                date: dirMtimeDate,
                slug,
                description: null,
            },
        };
    }
    else {
        const indexYaml = (0, file_1.readFile)(indexPath);
        // TODO: parsedYaml is possible undefined if file is empty
        // TODO: typescript ignored the intersection here. fix?
        const parsedYaml = js_yaml_1.default.load(indexYaml);
        if (parsedYaml) {
            return {
                dirName,
                dirMtimeDate,
                dirMetadata: {
                    title: parsedYaml.title ? parsedYaml.title : dirName,
                    date: parsedYaml.date ?
                        parsedYaml.date :
                        (0, file_1.getFileModifiedDate)(fullPath),
                    slug,
                    description: parsedYaml.description ? parsedYaml.description : null,
                },
            };
        }
        else {
            return {
                dirName,
                dirMtimeDate,
                dirMetadata: {
                    title: dirName,
                    date: (0, file_1.getFileModifiedDate)(fullPath),
                    slug,
                    description: null,
                },
            };
        }
    }
}
exports.default = getDirectoryMetadata;
