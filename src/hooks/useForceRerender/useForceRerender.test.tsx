import { jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { useForceRerender } from './useForceRerender.js';

describe('useForceRerender', () => {
  it('should not crash', async () => {
    renderHook(() => useForceRerender());
  });

  it('should return a function', async () => {
    const {
      result: { current: forceRerender },
    } = renderHook(() => useForceRerender());

    expect(forceRerender).toBeInstanceOf(Function);
  });

  it('should force a rerender', async () => {
    const spy = jest.fn();
    const {
      result: { current: forceRerender },
    } = renderHook(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const forceRerender = useForceRerender();

      spy();

      return forceRerender;
    });

    expect(spy).toBeCalledTimes(1);

    act(() => {
      forceRerender();
    });

    expect(spy).toBeCalledTimes(2);
  });
});
