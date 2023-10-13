import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useRefs } from '../../useRefs.js';
import type { MutableRefs } from '../../useRefs.types.js';
import { validateAndUnwrapRefs } from './validateAndUnwrapRefs.js';

type TestRefs = MutableRefs<{
  item1: string;
  item2: number;
}>;

describe('unwrapRefs', () => {
  it('should be invalid when ref object contains null field', () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    result.current.item1.current = null;
    result.current.item2.current = 2;

    expect(validateAndUnwrapRefs(result.current)).toEqual([false, undefined]);
  });

  it('should be invalid when ref object contains undefined field', () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    result.current.item1.current = undefined;
    result.current.item2.current = 2;

    expect(validateAndUnwrapRefs(result.current)).toEqual([false, undefined]);
  });

  it("should be valid when ref object doesn't contain null value", () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    result.current.item1.current = 'test';
    result.current.item2.current = 2;

    expect(validateAndUnwrapRefs(result.current)).toEqual([true, { item1: 'test', item2: 2 }]);
  });
});
