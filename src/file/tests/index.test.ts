import {getFileModifiedDate} from '..';
import {POSTS_DIR} from '../../config';

describe('getFileModifiedDate', () => {
  test('returns the correct file modified date format', () => {
    expect(getFileModifiedDate(POSTS_DIR))
        .toStrictEqual('2021-11-22');
  });
});


