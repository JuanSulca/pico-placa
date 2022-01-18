import { someFunc } from './main';

describe('some Func', () => {
  test('should return 2', () => {
    expect(someFunc()).toEqual(2);
  });
});
