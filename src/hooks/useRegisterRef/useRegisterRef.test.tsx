import { act, renderHook } from '@testing-library/react';
import { useRegisterRef } from './useRegisterRef.js';

describe('useRegisterRef', () => {
  it('should not crash', () => {
    renderHook(useRegisterRef);
  });

  it('should have correct initial state', () => {
    const { result } = renderHook(useRegisterRef);

    const [refs, registerRef] = result.current;
    expect(refs).toEqual({});
    expect(typeof registerRef).toBe('function');
  });

  it('should be able to register a ref', () => {
    const { result } = renderHook(useRegisterRef);
    const [refs, registerRef] = result.current;

    act(() => {
      registerRef('item')('A');
    });

    expect(refs).toEqual({ item: 'A' });
  });

  it('should be able to register Array refs', () => {
    const { result } = renderHook(useRegisterRef);
    const [refs, registerRef] = result.current;

    act(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      registerRef('items[]', 0)('A');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      registerRef('items[]', 1)('B');
    });

    expect(refs).toEqual({ items: ['A', 'B'] });
  });
});
