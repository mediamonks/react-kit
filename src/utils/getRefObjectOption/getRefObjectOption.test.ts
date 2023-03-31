import { getRefObjectOptionValue } from './getRefObjectOption.js';

describe('getRefObjectOption', () => {
  it('should return the current value of the ref object if it exists', () => {
    const value = { current: 'hello' };
    const result = getRefObjectOptionValue(value);

    expect(result).toEqual('hello');
  });

  it('should return the original value if it is not a ref object', () => {
    const value = 'world';
    const result = getRefObjectOptionValue(value);

    expect(result).toEqual('world');
  });

  it('should return null if the input is null', () => {
    expect(null).toBeNull();
  });
});
