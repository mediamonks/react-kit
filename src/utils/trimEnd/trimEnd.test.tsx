import { trimEnd } from './trimEnd';

describe('trimEnd', () => {
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

  it('should not end up in a loop when trimming undefined in empty array', async () => {
    const array: Array<unknown> = [];
    const arraySpy = jest.spyOn(array, 'pop');

    // Try to trimEnd of empty array
    trimEnd(array);

    expect(arraySpy).toHaveBeenCalledTimes(0);
  });
});
