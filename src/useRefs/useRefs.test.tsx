import { act, renderHook } from '@testing-library/react';
import { useRefs } from './useRefs';
import type { MutableRefs } from './useRefs.types';

type TestRefs = MutableRefs<{
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
});
