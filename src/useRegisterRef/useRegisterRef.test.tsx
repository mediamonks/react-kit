import { act, renderHook } from '@testing-library/react';
import { useRegisterRef } from './useRegisterRef';

describe('useRegisterRef', () => {
  it('should not crash', async () => {
    renderHook(useRegisterRef);
  });

  it('should have correct initial state', () => {
    const { result } = renderHook(useRegisterRef);

    const [refs, registerRef] = result.current;
    expect(refs).toEqual({});
    expect(typeof registerRef).toBe('function');
  });

  it('should be able to register a ref', async () => {
    const { result } = renderHook(useRegisterRef);
    const [refs, registerRef] = result.current;

    await act(() => {
      registerRef('item')('A');
    });

    expect(refs).toEqual({ item: 'A' });
  });

  it('should be able to register Array refs', async () => {
    const { result } = renderHook(useRegisterRef);
    const [refs, registerRef] = result.current;

    await act(() => {
      // @ts-ignore
      registerRef('items[]', 0)('A');
      // @ts-ignore
      registerRef('items[]', 1)('B');
    });

    expect(refs).toEqual({ items: ['A', 'B'] });
  });
});
