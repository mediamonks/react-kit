import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useRefs } from './useRefs.js';
import type { Refs } from './useRefs.types.js';

type TestRefs = Refs<{
  number1: number;
  number2: number;
  array: Array<number | null>;
}>;

describe('useRefs', () => {
  it('should not crash', () => {
    renderHook(() => {
      useRefs();
    });
  });

  it('should have correct initial state', () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    expect(result.current.number1).toMatchObject({
      current: null,
    });
  });

  it('should be able to register a ref', () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    act(() => {
      result.current.number1.current = 1;
      result.current.number2.current = 2;
    });

    expect(result.current).toMatchObject({
      number1: { current: 1 },
      number2: { current: 2 },
    });
  });

  it('should be able to set a ref to null', () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    act(() => {
      result.current.number1.current = 1;
    });

    expect(result.current.number1.current).toEqual(1);

    act(() => {
      result.current.number1.current = null;
    });

    expect(result.current.number1.current).toEqual(null);
  });
});
