"use strict";
/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dir_metadata_1 = __importDefault(require("../dir-metadata"));
const config_1 = require("../../config");
describe('getDirectoryMetadata', () => {
    describe('should get directory data for the root dir without an index.yaml', () => {
        const data = (0, dir_metadata_1.default)(config_1.POSTS_DIR);
        test.concurrent('title should equal dirName', () => {
            expect(data.dirMetadata.title).toStrictEqual(data.dirName);
        });
        test.concurrent('title should be blog-folder', () => {
            expect(data.dirMetadata.title).toStrictEqual('blog-folder');
        });
        test.concurrent('date should equal dirMtimeDate', () => {
            expect(data.dirMetadata.date).toStrictEqual(data.dirMtimeDate);
        });
        test.concurrent('slug should be an empty string', () => {
            expect(data.dirMetadata.slug).toStrictEqual('');
        });
        test.concurrent('description should be null', () => {
            expect(data.dirMetadata.description).toStrictEqual(null);
        });
    });
    describe('should get directory data for a dir with an index.yaml', () => {
        const data = (0, dir_metadata_1.default)(path_1.default.join(config_1.POSTS_DIR, 'drafts', 'second-level', 'third-level'));
        test.concurrent('title should be third level in yaml', () => {
            expect(data.dirMetadata.title).toStrictEqual('third level in yaml');
        });
        test.concurrent('date should be 2021-05-03', () => {
            expect(data.dirMetadata.date).toStrictEqual('2021-05-03');
        });
        test.concurrent('slug should be drafts/second-level/third-level', () => {
            expect(data.dirMetadata.slug).toStrictEqual('drafts/second-level/third-level');
        });
        test.concurrent('description should be these are third level articles', () => {
            expect(data.dirMetadata.description).toStrictEqual('these are third level articles');
        });
    });
    describe('should get directory data for a dir with an index.yaml that is missing some properties', () => {
        const data = (0, dir_metadata_1.default)(path_1.default.join(config_1.POSTS_DIR, 'drafts'));
        test.concurrent('title should be draft folder', () => {
            expect(data.dirMetadata.title).toStrictEqual('draft articles');
        });
        test.concurrent('date should equal dirMtimeDate', () => {
            expect(data.dirMetadata.date).toStrictEqual(data.dirMtimeDate);
        });
        test.concurrent('slug should be drafts', () => {
            expect(data.dirMetadata.slug).toStrictEqual('drafts');
        });
        test.concurrent('description should be null', () => {
            expect(data.dirMetadata.description).toStrictEqual(null);
        });
    });
    describe('should get directory data for a dir with an index.yaml that is missing all properties', () => {
        const data = (0, dir_metadata_1.default)(path_1.default.join(config_1.POSTS_DIR, 'drafts', 'second-level'));
        test.concurrent('title should equal dirName', () => {
            expect(data.dirMetadata.title).toStrictEqual(data.dirName);
        });
        test.concurrent('title should be second-level', () => {
            expect(data.dirMetadata.title).toStrictEqual('second-level');
        });
        test.concurrent('date should equal dirMtimeDate', () => {
            expect(data.dirMetadata.date).toStrictEqual(data.dirMtimeDate);
        });
        test.concurrent('slug should be drafts/second-level', () => {
            expect(data.dirMetadata.slug).toStrictEqual('drafts/second-level');
        });
        test.concurrent('description should be null', () => {
            expect(data.dirMetadata.description).toStrictEqual(null);
        });
    });
});
