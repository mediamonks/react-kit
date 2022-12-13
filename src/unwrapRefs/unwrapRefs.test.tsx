import { renderHook } from '@testing-library/react';
import { useRefs } from '../useRefs/useRefs';
import type { MutableRefs } from '../useRefs/useRefs.types';
import { unwrapRefs } from './unwrapRefs';

type TestRefs = MutableRefs<{
  item1: string;
  item2: number;
}>;

describe('unwrapRefs', () => {
  it('should not crash', () => {
    const { item1, item2 } = unwrapRefs({} as TestRefs);

    expect(item1).toBeUndefined();
    expect(item2).toBeUndefined();
  });

  it('should unwrap values from refs object', () => {
    const { result } = renderHook(() => useRefs<TestRefs>());

    result.current.item2.current = 1;

    const { item1, item2 } = unwrapRefs(result.current);

    expect(item1).toBeUndefined();
    expect(item2).toEqual(1);
  });
});
