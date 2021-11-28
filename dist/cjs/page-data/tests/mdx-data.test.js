"use strict";
/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const path_1 = __importDefault(require("path"));
const mdx_data_1 = __importDefault(require("../mdx-data"));
describe('getMdxData', () => {
    test.concurrent('content should be null when includeContent=false', () => {
        const articlePath = path_1.default.join(config_1.POSTS_DIR, 'root-article.mdx');
        const mdxFile = (0, mdx_data_1.default)(articlePath, false);
        expect(mdxFile.content).toStrictEqual(null);
    });
    test.concurrent('content should be a string when includeContent=true', () => {
        const articlePath = path_1.default.join(config_1.POSTS_DIR, 'root-article.mdx');
        const mdxFile = (0, mdx_data_1.default)(articlePath, true);
        expect(typeof mdxFile.content).toBe('string');
    });
    test.concurrent('content should be a string when includeContent is left out', () => {
        const articlePath = path_1.default.join(config_1.POSTS_DIR, 'root-article.mdx');
        const mdxFile = (0, mdx_data_1.default)(articlePath);
        expect(typeof mdxFile.content).toBe('string');
    });
    describe('should get mdx data correctly with full front matter present', () => {
        const articlePath = path_1.default.join(config_1.POSTS_DIR, 'root-article.mdx');
        const mdxFile = (0, mdx_data_1.default)(articlePath);
        const { metadata } = mdxFile;
        describe('base data is correct', () => {
            test.concurrent('fileName is correct', () => {
                expect(mdxFile.fileName).toStrictEqual('root-article.mdx');
            });
            // test.concurrent('mtimeDate is correct', () => {
            //   expect(mdxFile.mtimeDate).toStrictEqual('2021-11-22');
            // });
            test.concurrent('content is correct', () => {
                expect(mdxFile.content).toStrictEqual('This is the root article content.');
            });
        });
        describe('default metadata is correctly overwritten', () => {
            test.concurrent('title is correct', () => {
                expect(metadata.title).toStrictEqual('root article');
            });
            test.concurrent('date is correct', () => {
                expect(metadata.date).toStrictEqual('2021-08-24');
            });
            test.concurrent('slug is correct', () => {
                expect(metadata.slug).toStrictEqual('root-article');
            });
        });
        describe('extra metadata is correct', () => {
            test.concurrent('description is correct', () => {
                expect(metadata.description).toStrictEqual('this is the root article');
            });
            test.concurrent('readTime is correct', () => {
                expect(metadata.readTime).toStrictEqual(20);
            });
            test.concurrent('tags are correct', () => {
                expect(metadata.tags).toStrictEqual(['rootLevel', 'testing']);
            });
        });
    });
    describe('should get mdx data correctly for an article with no front matter', () => {
        const articlePath = path_1.default.join(config_1.POSTS_DIR, 'no-frontmatter-article.mdx');
        const mdxFile = (0, mdx_data_1.default)(articlePath);
        const { metadata } = mdxFile;
        describe('base data is correct', () => {
            test.concurrent('fileName is correct', () => {
                expect(mdxFile.fileName).toStrictEqual('no-frontmatter-article.mdx');
            });
            // test.concurrent('mtimeDate is correct', () => {
            //   expect(mdxFile.mtimeDate).toStrictEqual('2021-11-22');
            // });
            test.concurrent('content is an empty string', () => {
                expect(mdxFile.content).toStrictEqual('This is an article with no front matter.');
            });
        });
        describe('default metadata is correctly overwritten', () => {
            test.concurrent('title should equal fileName', () => {
                expect(metadata.title).toStrictEqual(mdxFile.fileName);
            });
            test.concurrent('title is correct', () => {
                expect(metadata.title).toStrictEqual('no-frontmatter-article.mdx');
            });
            test.concurrent('date should equal mtimeDate', () => {
                expect(metadata.date).toStrictEqual(mdxFile.mtimeDate);
            });
            // test.concurrent('date is correct', () => {
            //   expect(metadata.date).toStrictEqual('2021-11-22');
            // });
            test.concurrent('slug is correct', () => {
                expect(metadata.slug).toStrictEqual('no-frontmatter-article');
            });
        });
    });
    describe('should get mdx data correctly for an empty article', () => {
        const articlePath = path_1.default.join(config_1.POSTS_DIR, 'empty-article.mdx');
        const mdxFile = (0, mdx_data_1.default)(articlePath);
        const { metadata } = mdxFile;
        describe('base data is correct', () => {
            test.concurrent('fileName is correct', () => {
                expect(mdxFile.fileName).toStrictEqual('empty-article.mdx');
            });
            // test.concurrent('mtimeDate is correct', () => {
            //   expect(mdxFile.mtimeDate).toStrictEqual('2021-11-22');
            // });
            test.concurrent('content is an empty string', () => {
                expect(mdxFile.content).toStrictEqual('');
            });
        });
        describe('default metadata is correctly overwritten', () => {
            test.concurrent('title should equal fileName', () => {
                expect(metadata.title).toStrictEqual(mdxFile.fileName);
            });
            test.concurrent('title is correct', () => {
                expect(metadata.title).toStrictEqual('empty-article.mdx');
            });
            test.concurrent('date should equal mtimeDate', () => {
                expect(metadata.date).toStrictEqual(mdxFile.mtimeDate);
            });
            // test.concurrent('date is correct', () => {
            //   expect(metadata.date).toStrictEqual('2021-11-22');
            // });
            test.concurrent('slug is correct', () => {
                expect(metadata.slug).toStrictEqual('empty-article');
            });
        });
    });
});
