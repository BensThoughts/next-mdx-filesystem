"use strict";
/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const fs_1 = __importDefault(require("fs"));
describe('getFullPathFromSlug', () => {
    describe('should NOT work when the slug starts with a /', () => {
        const slug = '/drafts/second-level/third-level';
        test.concurrent('an error is thrown', () => {
            expect(() => (0, __1.getFullPathFromSlug)(slug)).toThrow();
        });
    });
    describe('should work when the slug is correct', () => {
        const fullPath = (0, __1.getFullPathFromSlug)('drafts/second-level/third-level');
        test.concurrent('the full path exists', () => {
            expect(fs_1.default.existsSync(fullPath)).toStrictEqual(true);
        });
    });
});
describe('getSlugFromFullPath', () => {
    describe('should return the same slug with a dir', () => {
        const fullPath = (0, __1.getFullPathFromSlug)('drafts/second-level/third-level');
        const slug = (0, __1.getSlugFromFullPath)(fullPath);
        test.concurrent('the slug is correct', () => {
            expect(slug).toStrictEqual('drafts/second-level/third-level');
        });
    });
    describe('should return a proper slug with an mdx', () => {
        // note, a .mdx file is not usually fed into getFullPathFromSlug ever
        // (slugs) don't end with .mdx, this is just for testing.
        const fullPath = (0, __1.getFullPathFromSlug)('drafts/second-level/third-level/third-level-article.mdx');
        const slug = (0, __1.getSlugFromFullPath)(fullPath);
        test.concurrent('the slug is correct', () => {
            expect(slug).toStrictEqual('drafts/second-level/third-level/third-level-article');
        });
    });
});
