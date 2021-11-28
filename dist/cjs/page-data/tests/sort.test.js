"use strict";
/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
Object.defineProperty(exports, "__esModule", { value: true });
const sort_1 = require("../sort");
describe('sortMdxFilesByDate', () => {
    test.concurrent('should be sorted by standard date with latest date first', () => {
        const mdxData = [
            {
                fileName: 'a',
                mtimeDate: '2022-01-03',
                content: null,
                metadata: {
                    title: 'b-article-1',
                    date: '2020-01-03',
                    slug: '',
                },
            },
            {
                fileName: 'a',
                mtimeDate: '2019-01-01',
                content: null,
                metadata: {
                    title: 'a-article-1',
                    date: '2021-01-03',
                    slug: '',
                },
            },
            {
                fileName: 'a',
                mtimeDate: '2020-01-03',
                content: null,
                metadata: {
                    title: 'c-article-1',
                    date: '2022-01-03',
                    slug: '',
                },
            },
        ];
        const sortedData = (0, sort_1.sortMdxFilesByDate)(mdxData);
        const isSorted = (arr) => arr.every((v, i, a) => !i || a[i - 1].metadata.date >= v.metadata.date);
        expect(isSorted(sortedData)).toStrictEqual(true);
    });
});
describe('sortDirsByTitle', () => {
    test.concurrent('should sort correctly based on title prop', () => {
        const dirData = [
            {
                dirName: 'a',
                dirMtimeDate: '2022-01-01',
                dirMetadata: {
                    title: 'React',
                    date: '2022-01-01',
                    slug: '',
                    description: null,
                },
                mdxFiles: [],
            },
            {
                dirName: 'a',
                dirMtimeDate: '2022-01-01',
                dirMetadata: {
                    title: 'blog-posts',
                    date: '2022-01-01',
                    slug: '',
                    description: null,
                },
                mdxFiles: [],
            },
            {
                dirName: 'a',
                dirMtimeDate: '2022-01-01',
                dirMetadata: {
                    title: 'Google Cloud',
                    date: '2022-01-01',
                    slug: '',
                    description: null,
                },
                mdxFiles: [],
            },
            {
                dirName: 'a',
                dirMtimeDate: '2022-01-01',
                dirMetadata: {
                    title: 'Drafts',
                    date: '2022-01-01',
                    slug: '',
                    description: null,
                },
                mdxFiles: [],
            },
            {
                dirName: 'a',
                dirMtimeDate: '2022-01-01',
                dirMetadata: {
                    title: 'Recursive-test-1',
                    date: '2022-01-01',
                    slug: '',
                    description: null,
                },
                mdxFiles: [],
            },
            {
                dirName: 'a',
                dirMtimeDate: '2022-01-01',
                dirMetadata: {
                    title: 'design',
                    date: '2022-01-01',
                    slug: '',
                    description: null,
                },
                mdxFiles: [],
            },
        ];
        const sortedData = (0, sort_1.sortDirsByTitle)(dirData);
        const isSorted = (arr) => arr.every((v, i, a) => !i || a[i - 1].dirMetadata.title.toLocaleLowerCase() <= v.dirMetadata.title.toLocaleLowerCase());
        expect(isSorted(sortedData)).toStrictEqual(true);
    });
});
