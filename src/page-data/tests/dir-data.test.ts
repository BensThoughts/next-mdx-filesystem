/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */

import path from 'path';
import getDirectoryMetadata from '../dir-data';
import {POSTS_DIR} from '../../config';

describe('getDirectoryMetadata', () => {
  describe('should get directory data for the root dir without an index.yaml', () => {
    const data = getDirectoryMetadata(POSTS_DIR);
    test.concurrent('title should be blog-folder', () => {
      expect(data.title).toStrictEqual('blog-folder');
    });
    test.concurrent('date should be 2021-11-22', () => {
      expect(data.date).toStrictEqual('2021-11-22');
    });
    test.concurrent('slug should be an empty string', () => {
      expect(data.slug).toStrictEqual('');
    });
    test.concurrent('description should be null', () => {
      expect(data.description).toStrictEqual(null);
    });
  });

  describe('should get directory data for a dir with an index.yaml', () => {
    const data = getDirectoryMetadata(path.join(POSTS_DIR, 'drafts', 'second-level', 'third-level'));
    test.concurrent('title should be third level in yaml', () => {
      expect(data.title).toStrictEqual('third level in yaml');
    });
    test.concurrent('date should be 2021-05-03', () => {
      expect(data.date).toStrictEqual('2021-05-03');
    });
    test.concurrent('slug should be drafts/second-level/third-level', () => {
      expect(data.slug).toStrictEqual('drafts/second-level/third-level');
    });
    test.concurrent('description should be these are third level articles', () => {
      expect(data.description).toStrictEqual('these are third level articles');
    });
  });
});
