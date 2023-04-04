import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useStaticValue } from './useStaticValue.js';

describe('useStaticValue', () => {
  it('should not crash', async () => {
    renderHook(() => useStaticValue(() => ['foo', 'bar']));
  });

  it('should return the correct value', async () => {
    const { result } = renderHook(() => useStaticValue(() => ['foo', 'bar']));

    expect(result.current).toEqual(['foo', 'bar']);
  });

  it('should execute the initializeFunction only once', async () => {
    const initializeFunction = jest.fn(() => ['foo', 'bar']);
    const { result, rerender } = renderHook(() => useStaticValue(initializeFunction));

    expect(initializeFunction).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(['foo', 'bar']);

    rerender();

    expect(initializeFunction).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(['foo', 'bar']);
  });
});
