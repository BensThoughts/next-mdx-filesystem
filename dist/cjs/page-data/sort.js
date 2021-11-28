"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortMdxFilesByDate = exports.sortDirsByTitle = void 0;
function sortDirsByTitle(arr) {
    return arr
        .sort((a, b) => {
        return (a.dirMetadata.title.toLocaleLowerCase() >
            b.dirMetadata.title.toLocaleLowerCase()) ? 1 : -1;
    });
}
exports.sortDirsByTitle = sortDirsByTitle;
function sortMdxFilesByDate(arr) {
    return arr.sort((a, b) => (a.metadata.date < b.metadata.date) ? 1 : -1);
}
exports.sortMdxFilesByDate = sortMdxFilesByDate;
