"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortMdxFilesByDate = exports.sortDirsByTitle = void 0;
function sortDirsByTitle(arr) {
    return arr
        .sort((a, b) => a.dirMetadata.title.localeCompare(b.dirMetadata.title));
}
exports.sortDirsByTitle = sortDirsByTitle;
function sortMdxFilesByDate(arr) {
    return arr.sort((a, b) => {
        const localeComparison = b.metadata.date.localeCompare(a.metadata.date);
        if (localeComparison === 0) {
            return a.metadata.title.localeCompare(b.metadata.title);
        }
        else {
            return localeComparison;
        }
    });
}
exports.sortMdxFilesByDate = sortMdxFilesByDate;
