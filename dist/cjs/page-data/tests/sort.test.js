"use strict";
/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
Object.defineProperty(exports, "__esModule", { value: true });
const sort_1 = require("../sort");
describe('sortMdxFilesByDate', () => {
    test.concurrent('should be sorted by standard date with latest date first', () => {
        const mdxData = [
            {
                fileName: 'test',
                mtimeDate: '2022-01-03',
                content: null,
                metadata: {
                    title: '6',
                    date: '2022-01-02',
                    slug: '',
                },
            },
            {
                fileName: 'test',
                mtimeDate: '2019-01-01',
                content: null,
                metadata: {
                    title: 'a',
                    date: '2022-01-04',
                    slug: '',
                },
            },
            {
                fileName: 'test',
                mtimeDate: '2019-01-01',
                content: null,
                metadata: {
                    title: 'd',
                    date: '2022-01-04',
                    slug: '',
                },
            },
            {
                fileName: 'test',
                mtimeDate: '2019-01-01',
                content: null,
                metadata: {
                    title: 'c',
                    date: '2022-01-04',
                    slug: '',
                },
            },
            {
                fileName: 'test',
                mtimeDate: '2019-01-01',
                content: null,
                metadata: {
                    title: 'b',
                    date: '2022-01-04',
                    slug: '',
                },
            },
            {
                fileName: 'test',
                mtimeDate: '2020-01-03',
                content: null,
                metadata: {
                    title: '5',
                    date: '2022-01-03',
                    slug: '',
                },
            },
            {
                fileName: 'test',
                mtimeDate: '2020-01-03',
                content: null,
                metadata: {
                    title: '0',
                    date: '2022-01-05',
                    slug: '',
                },
            },
        ];
        const sortedData = (0, sort_1.sortMdxFilesByDate)(mdxData);
        expect(sortedData[0].metadata.title).toBe('0');
        expect(sortedData[1].metadata.title).toBe('a');
        expect(sortedData[2].metadata.title).toBe('b');
        expect(sortedData[3].metadata.title).toBe('c');
        expect(sortedData[4].metadata.title).toBe('d');
        expect(sortedData[5].metadata.title).toBe('5');
        expect(sortedData[6].metadata.title).toBe('6');
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
        expect(sortedData[0].dirMetadata.title).toBe('blog-posts');
        expect(sortedData[1].dirMetadata.title).toBe('design');
        expect(sortedData[2].dirMetadata.title).toBe('Drafts');
        expect(sortedData[3].dirMetadata.title).toBe('Google Cloud');
        expect(sortedData[4].dirMetadata.title).toBe('React');
    });
});
