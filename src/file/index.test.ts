import {getFileModifiedDate} from '.';

describe('getFileModifiedDate', () => {
  test('returns the correct file modified date format', () => {
    expect(getFileModifiedDate('./src/tests/blog-folder'))
        .toStrictEqual('2021-11-22');
  });
});


