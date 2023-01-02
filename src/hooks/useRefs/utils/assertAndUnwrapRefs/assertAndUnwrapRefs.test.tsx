import { renderHook } from '@testing-library/react';
import { useRefs } from '../../useRefs.js';
import type { MutableRefs } from '../../useRefs.types.js';
import { assertAndUnwrapRefs } from './assertAndUnwrapRefs.js';

type TestRefs = MutableRefs<{
  item1: string;
  item2: number;
}>;

describe('unwrapRefs', () => {
  it('should throw when ref object contains null field', () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    result.current.item1.current = null;
    result.current.item2.current = 2;

    expect(() => assertAndUnwrapRefs(result.current)).toThrow();
  });

  it('should throw when ref object contains undefined field', () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    result.current.item1.current = undefined;
    result.current.item2.current = 2;

    expect(() => assertAndUnwrapRefs(result.current)).toThrow();
  });

  it("should not throw when ref object doesn't contain null value", () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    result.current.item1.current = 'test';
    result.current.item2.current = 2;

    expect(() => assertAndUnwrapRefs(result.current)).not.toThrow();
  });
});
