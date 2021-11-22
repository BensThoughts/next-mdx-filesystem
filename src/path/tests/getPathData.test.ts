/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */

import fs from 'fs';
import {
  getPathData,
} from '../index';
import {
  POSTS_DIR,
} from '../../config/index';

describe('getPathData', () => {
  describe('getPathData should read a first level directory correctly', () => {
    const dirents = fs.readdirSync(POSTS_DIR, {withFileTypes: true});
    const pathData = getPathData(
        POSTS_DIR,
        dirents.filter((dirent) => dirent.name === 'drafts')[0],
    );
    // test.concurrent('returns correct fullPath', () => {
    //   expect(pathData.fullPath).toStrictEqual('src/tests/blog-folder/drafts');
    // });
    test.concurrent('returns correct slug', () => {
      expect(pathData.slug).toStrictEqual('drafts');
    });
    test.concurrent('returns isMdx false', () => {
      expect(pathData.isMdx).toStrictEqual(false);
    });
    test.concurrent('returns isDirectory true', () => {
      expect(pathData.isDirectory).toStrictEqual(true);
    });
    test.concurrent('returns isExcludedPath false', () => {
      expect(pathData.isExcludedPath).toStrictEqual(false);
    });
  });

  describe('getPathData should read a first level mdx file correctly', () => {
    const dirents = fs.readdirSync(POSTS_DIR, {withFileTypes: true});
    const pathData = getPathData(
        POSTS_DIR,
        dirents.filter((dirent) => dirent.name === 'root-article.mdx')[0],
    );
    test.concurrent('returns correct slug', () => {
      expect(pathData.slug).toStrictEqual('root-article');
    });
    test.concurrent('returns isMdx false', () => {
      expect(pathData.isMdx).toStrictEqual(true);
    });
    test.concurrent('returns isDirectory true', () => {
      expect(pathData.isDirectory).toStrictEqual(false);
    });
    test.concurrent('returns isExcludedPath false', () => {
      expect(pathData.isExcludedPath).toStrictEqual(false);
    });
  });

  describe('getPathData should read a third-level level directory correctly', () => {
    const cwd = POSTS_DIR + '/drafts/second-level'; ;
    const dirents = fs.readdirSync(
        cwd,
        {withFileTypes: true},
    );
    const pathData = getPathData(
        cwd,
        dirents.filter((dirent) => dirent.name === 'third-level')[0],
    );
    test.concurrent('returns correct slug', () => {
      expect(pathData.slug).toStrictEqual('drafts/second-level/third-level');
    });
    test.concurrent('returns isMdx false', () => {
      expect(pathData.isMdx).toStrictEqual(false);
    });
    test.concurrent('returns isDirectory true', () => {
      expect(pathData.isDirectory).toStrictEqual(true);
    });
    test.concurrent('returns isExcludedPath false', () => {
      expect(pathData.isExcludedPath).toStrictEqual(false);
    });
  });

  describe('getPathData should read a second-level level mdx file correctly', () => {
    const cwd = POSTS_DIR + '/drafts/second-level'; ;
    const dirents = fs.readdirSync(
        cwd,
        {withFileTypes: true},
    );
    const pathData = getPathData(
        cwd,
        dirents.filter((dirent) => dirent.name === 'second-level-article.mdx')[0],
    );
    test.concurrent('returns correct slug', () => {
      expect(pathData.slug).toStrictEqual('drafts/second-level/second-level-article');
    });
    test.concurrent('returns isMdx false', () => {
      expect(pathData.isMdx).toStrictEqual(true);
    });
    test.concurrent('returns isDirectory true', () => {
      expect(pathData.isDirectory).toStrictEqual(false);
    });
    test.concurrent('returns isExcludedPath false', () => {
      expect(pathData.isExcludedPath).toStrictEqual(false);
    });
  });
});

