import {
  formatDate,
} from '..';

describe('formatDate', () => {
  test('returns the correct file modified date format', () => {
    const date = new Date(2021, 10, 22);
    expect(formatDate(date))
        .toStrictEqual('2021-11-22');
  });
});
