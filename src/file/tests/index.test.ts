import path from 'path';

import {
  formatDate,
  isPathDir,
  isPathFile,
} from '..';

import {
  POSTS_DIR,
} from '../../config';

describe('formatDate', () => {
  test('returns the correct file modified date format', () => {
    const date = new Date(2021, 10, 22);
    expect(formatDate(date))
        .toStrictEqual('2021-11-22');
  });
});

describe('isPathDir', () => {
  test('should be true when path is dir', () => {
    expect(isPathDir(POSTS_DIR)).toBe(true);
  });
  test('should be false when path is a file', () => {
    expect(isPathDir(path.join(POSTS_DIR, 'root-article.mdx'))).toBe(false);
  });
});

describe('isPathFile', () => {
  test('should be true when path is file', () => {
    expect(isPathFile(path.join(POSTS_DIR, 'root-article.mdx'))).toBe(true);
  });
  test('should be false when path is a dir', () => {
    expect(isPathFile(POSTS_DIR)).toBe(false);
  });
});
