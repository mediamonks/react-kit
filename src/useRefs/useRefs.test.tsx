import { act, renderHook } from '@testing-library/react';
import { useRefs } from './useRefs';
import type { Refs } from './useRefs.types';
import { arrayRef } from './useRefs.util';

type TestRefs = Refs<{
  number1: number;
  number2: number;
  array: Array<number | null>;
}>;

describe('useRefs', () => {
  it('should not crash', async () => {
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

  it('should be able to register a ref', async () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    await act(() => {
      result.current.number1.current = 1;
      result.current.number2.current = 2;
    });

    expect(result.current).toMatchObject({
      number1: { current: 1 },
      number2: { current: 2 },
    });
  });

  it('should be able to set a ref to null', async () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    await act(() => {
      result.current.number1.current = 1;
    });

    expect(result.current.number1.current).toEqual(1);

    await act(() => {
      result.current.number1.current = null;
    });

    expect(result.current.number1.current).toEqual(null);
  });

  it('should trim Array refs when items disappear', async () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    await act(() => {
      arrayRef(result.current.array, 0)(0);
      arrayRef(result.current.array, 2)(2);

      // Should only set 2nd element in array after 3rd element to make sure
      // it's not trimmed immediately
      arrayRef(result.current.array, 1)(null);

      // 4th element in array should be trimmed
      arrayRef(result.current.array, 3)(null);
    });

    expect(result.current.array.current).toEqual([0, null, 2]);

    await act(() => {
      arrayRef(result.current.array, 2)(null);
    });

    expect(result.current.array.current).toEqual([0]);
  });
});
