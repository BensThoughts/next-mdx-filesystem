"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("../file");
const path_1 = require("../path");
const config_1 = require("../config");
function getSlugsInDir(cwd) {
    const slugData = {
        directories: [],
        mdxFiles: [],
    };
    const dirents = (0, file_1.readDir)(cwd);
    dirents.forEach((dirent) => {
        const { isDirectory, isMdx, isExcludedPath, slug, } = (0, path_1.getPathData)(cwd, dirent);
        if (!isDirectory && isMdx) {
            slugData.mdxFiles.push({
                params: {
                    slug: (0, path_1.slugToArray)(slug),
                },
            });
        }
        else if (isDirectory && !isExcludedPath) {
            slugData.directories.push({
                params: {
                    slug: (0, path_1.slugToArray)(slug),
                },
            });
        }
        ;
    });
    return slugData;
}
function getAllSlugs(cwd = config_1.POSTS_DIR, slugData = {
    directories: [],
    mdxFiles: [],
}) {
    const { directories, mdxFiles } = getSlugsInDir(cwd);
    slugData.directories.push(...directories);
    slugData.mdxFiles.push(...mdxFiles);
    directories.forEach(({ params: { slug } }) => {
        const nextCwd = (0, path_1.slugArrayToFullPath)(slug);
        slugData = getAllSlugs(nextCwd, slugData);
    });
    return slugData;
}
exports.default = getAllSlugs;
