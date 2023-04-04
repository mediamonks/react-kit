import { unref } from './unref.js';

describe('unref', () => {
  it('should return the current value of the ref object if it exists', () => {
    const value = { current: 'hello' };
    const result = unref(value);

    expect(result).toEqual('hello');
  });

  it('should return the original value if it is not a ref object', () => {
    const value = 'world';
    const result = unref(value);

    expect(result).toEqual('world');
  });

  it('should return null if the input is null', () => {
    const result = unref(null);

    expect(result).toBeNull();
  });
});
