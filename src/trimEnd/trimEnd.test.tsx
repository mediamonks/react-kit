import { trimEnd } from './trimEnd';

describe('createRefArray', () => {
  it('should not crash', async () => {
    expect(() => trimEnd([], null)).not.toThrow();
  });

  it('should keep items with null value', async () => {
    const array = [Symbol('trimEnd'), null, null, Symbol('trimEnd'), Symbol('trimEnd')];

    expect(trimEnd(array, null)).toHaveLength(5);
  });

  it('should trim items with null value', async () => {
    const array = [Symbol('trimEnd'), null, Symbol('trimEnd'), Symbol('trimEnd'), null, null, null];

    expect(trimEnd(array, null)).toHaveLength(4);
  });
});
