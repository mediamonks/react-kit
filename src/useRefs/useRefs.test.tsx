import { act, renderHook } from '@testing-library/react';
import { useRefs } from './useRefs';
import type { Refs } from './useRefs.types';

type TestRefs = Refs<{
  number1: number;
  number2: number;
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
});
