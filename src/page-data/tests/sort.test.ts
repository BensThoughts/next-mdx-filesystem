/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */

import {sortDirsByTitle, sortMdxFilesByDate} from '../sort';
import {DirectoryData, MdxFileData} from '../../interface';
import {BlogArticleMetadata} from '../../test-interface';

describe('sortMdxFilesByDate', () => {
  test.concurrent('should be sorted by standard date with latest date first', () => {
    const mdxData: MdxFileData[] = [
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
    const sortedData = sortMdxFilesByDate(mdxData);
    const isSorted = (arr: MdxFileData[]) =>
      arr.every((v, i, a) => !i || a[i-1].metadata.date >= v.metadata.date);

    expect(isSorted(sortedData)).toStrictEqual(true);
  });
});

describe('sortDirsByTitle', () => {
  test.concurrent('should sort correctly based on title prop', () => {
    const dirData: DirectoryData<BlogArticleMetadata>[] = [
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
    const sortedData = sortDirsByTitle(dirData);
    const isSorted = (arr: DirectoryData<BlogArticleMetadata>[]) =>
      arr.every((v, i, a) => !i || a[i-1].dirMetadata.title.toLocaleLowerCase() <= v.dirMetadata.title.toLocaleLowerCase());

    expect(isSorted(sortedData)).toStrictEqual(true);
  });
});
