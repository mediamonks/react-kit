import { describe, expect, it } from 'vitest';
import { isRefObject } from './isRefObject.js';

describe('isRefObject', () => {
  it('should return true if the value is a ref object with a truthy value', () => {
    const value = { current: 'hello' };
    const result = isRefObject(value);

    expect(result).toBe(true);
  });

  it('should return true if the value is a ref object with a falsy value', () => {
    const value = { current: false };
    const result = isRefObject(value);

    expect(result).toBe(true);
  });

  it('should return true if the value is a ref object with `null` value', () => {
    const value = { current: null };
    const result = isRefObject(value);

    expect(result).toBe(true);
  });

  it('should return false if value is not a ref object', () => {
    const value = 'world';
    const result = isRefObject(value);

    expect(result).toBe(false);
  });

  it('should return false if the input is null', () => {
    const result = isRefObject(null);

    expect(result).toBe(false);
  });
});
