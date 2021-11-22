/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */

import {
  getFullPathFromSlug,
  getSlugFromFullPath,
} from '..';
import fs from 'fs';

describe('getFullPathFromSlug', () => {
  describe('should NOT work when the slug starts with a /', () => {
    const slug = '/drafts/second-level/third-level';
    test.concurrent('an error is thrown', () => {
      expect(() => getFullPathFromSlug(slug)).toThrow();
    });
  });

  describe('should work when the slug is correct', () => {
    const fullPath = getFullPathFromSlug('drafts/second-level/third-level');
    test.concurrent('the full path exists', () => {
      expect(fs.existsSync(fullPath)).toStrictEqual(true);
    });
  });
});

describe('getSlugFromFullPath', () => {
  describe('should return the same slug with a dir', () => {
    const fullPath = getFullPathFromSlug('drafts/second-level/third-level');
    const slug = getSlugFromFullPath(fullPath);
    test.concurrent('the slug is correct', () => {
      expect(slug).toStrictEqual('drafts/second-level/third-level');
    });
  });

  describe('should return a proper slug with an mdx', () => {
    // note, a .mdx file is not usually fed into getFullPathFromSlug ever
    // (slugs) don't end with .mdx, this is just for testing.
    const fullPath = getFullPathFromSlug('drafts/second-level/third-level/third-level-article.mdx');
    const slug = getSlugFromFullPath(fullPath);
    test.concurrent('the slug is correct', () => {
      expect(slug).toStrictEqual('drafts/second-level/third-level/third-level-article');
    });
  });
});
