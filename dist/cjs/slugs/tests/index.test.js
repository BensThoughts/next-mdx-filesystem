"use strict";
/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
describe('getAllSlugs', () => {
    const { directories, mdxFiles } = (0, index_1.default)();
    test.concurrent('should get all of the slugs for directories', () => {
        expect(directories).toStrictEqual([
            {
                'params': {
                    'slug': ['design'],
                },
            },
            {
                'params': {
                    'slug': ['drafts'],
                },
            },
            {
                'params': {
                    'slug': ['google-cloud-articles'],
                },
            },
            {
                'params': {
                    'slug': ['react-articles'],
                },
            },
            {
                'params': {
                    'slug': ['drafts', 'second-level'],
                },
            },
            {
                'params': {
                    'slug': ['drafts', 'second-level', 'third-level'],
                },
            },
        ]);
    });
    test.concurrent('should get all of the slugs for mdxFiles', () => {
        expect(mdxFiles).toStrictEqual([
            {
                'params': {
                    'slug': ['empty-article'],
                },
            },
            {
                'params': {
                    'slug': ['no-frontmatter-article'],
                },
            },
            {
                'params': {
                    'slug': ['root-article'],
                },
            },
            {
                'params': {
                    'slug': ['design', 'design-article-1'],
                },
            },
            {
                'params': {
                    'slug': ['design', 'design-article-2'],
                },
            },
            {
                'params': {
                    'slug': ['drafts', 'draft-1'],
                },
            },
            {
                'params': {
                    'slug': ['drafts', 'draft-2'],
                },
            },
            {
                'params': {
                    'slug': ['drafts', 'second-level', 'second-level-article'],
                },
            },
            {
                'params': {
                    'slug': ['drafts', 'second-level', 'third-level', 'third-level-article'],
                },
            },
            {
                'params': {
                    'slug': ['google-cloud-articles', 'google-cloud-article-1'],
                },
            },
            {
                'params': {
                    'slug': ['react-articles', 'react-article-1'],
                },
            },
            {
                'params': {
                    'slug': ['react-articles', 'react-article-2'],
                },
            },
            {
                'params': {
                    'slug': ['react-articles', 'react-article-3'],
                },
            },
        ]);
    });
});
