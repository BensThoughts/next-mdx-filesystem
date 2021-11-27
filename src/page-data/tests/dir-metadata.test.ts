/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */

import path from 'path';
import getDirectoryMetadata from '../dir-metadata';
import {POSTS_DIR} from '../../config';

describe('getDirectoryMetadata', () => {
  describe('should get directory data for the root dir without an index.yaml', () => {
    const data = getDirectoryMetadata(POSTS_DIR);
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
    const data = getDirectoryMetadata(path.join(POSTS_DIR, 'drafts', 'second-level', 'third-level'));
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
    const data = getDirectoryMetadata(path.join(POSTS_DIR, 'drafts'));
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
    const data = getDirectoryMetadata(path.join(POSTS_DIR, 'drafts', 'second-level'));
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
