"use strict";
/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tree_1 = __importDefault(require("../tree"));
const config_1 = require("../../config");
const path_1 = __importDefault(require("path"));
describe('getDirectoryTree', () => {
    describe('called with no options', () => {
        const tree = (0, tree_1.default)();
        test.concurrent('directories should be sorted alphabetically descending', () => {
            const isSorted = (arr) => arr.every((v, i, a) => !i || a[i - 1].dirMetadata.title <= v.dirMetadata.title);
            expect(isSorted(tree.directories)).toStrictEqual(true);
        });
        test.concurrent('base directory mdxFiles should be sorted by their date with most current first', () => {
            const isSorted = (arr) => arr.every((v, i, a) => !i || a[i - 1].metadata.date >= v.metadata.date);
            expect(isSorted(tree.mdxFiles)).toStrictEqual(true);
        });
        test.concurrent('lower level directory mdxFiles should be sorted by their date with most current first', () => {
            const isSorted = (arr) => arr.every((v, i, a) => !i || a[i - 1].metadata.date >= v.metadata.date);
            expect(tree.directories.every((dir) => isSorted(dir.mdxFiles))).toStrictEqual(true);
        });
        test.concurrent('there should be 3 files in mdxFiles prop', () => {
            expect(tree.mdxFiles.length).toStrictEqual(3);
        });
        test.concurrent('there should be 4 directories in directories prop', () => {
            expect(tree.directories.length).toStrictEqual(4);
        });
    });
    describe('called with shallow=true from POSTS_DIR', () => {
        const tree = (0, tree_1.default)(config_1.POSTS_DIR, true);
        test.concurrent('the directories in the directories prop should have no mdxFiles in them', () => {
            expect(tree.directories.every((dir) => (dir.mdxFiles.length === 0))).toStrictEqual(true);
        });
        test.concurrent('the directories in the directories prop should have no directories in them', () => {
            expect(tree.directories.every((dir) => (dir.directories.length === 0))).toStrictEqual(true);
        });
        test.concurrent('directories should be sorted alphabetically descending', () => {
            const isSorted = (arr) => arr.every((v, i, a) => !i || a[i - 1].dirMetadata.title <= v.dirMetadata.title);
            expect(isSorted(tree.directories)).toStrictEqual(true);
        });
        test.concurrent('base directory mdxFiles should be sorted by their date with most current first', () => {
            const isSorted = (arr) => arr.every((v, i, a) => !i || a[i - 1].metadata.date >= v.metadata.date);
            expect(isSorted(tree.mdxFiles)).toStrictEqual(true);
        });
    });
    describe('called with shallow=false from POSTS_DIR/drafts', () => {
        const tree = (0, tree_1.default)(path_1.default.join(config_1.POSTS_DIR, 'drafts'), false);
        test.concurrent('the first level dir should have 2 mdx article in it', () => {
            expect(tree.mdxFiles.length).toStrictEqual(2);
        });
        test.concurrent('the first level dir should have 1 directory in it', () => {
            expect(tree.directories.length).toStrictEqual(1);
        });
        test.concurrent('the second level dir should have 1 mdx article in it', () => {
            expect(tree.directories[0].mdxFiles.length).toStrictEqual(1);
        });
        test.concurrent('the second level dir should have 1 directory in it', () => {
            expect(tree.directories[0].directories.length).toStrictEqual(1);
        });
        test.concurrent('the third level dir should have 1 mdx article in it', () => {
            expect(tree.directories[0].directories[0].mdxFiles.length).toStrictEqual(1);
        });
        test.concurrent('the third level dir should have 0 directories in it', () => {
            expect(tree.directories[0].directories[0].directories.length).toStrictEqual(0);
        });
    });
});
