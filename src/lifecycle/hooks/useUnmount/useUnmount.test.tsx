import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useUnmount } from './useUnmount.js';

describe('useUnmount', () => {
  it('should not crash', async () => {
    const { rerender, unmount } = renderHook(useUnmount, {
      // eslint-disable-next-line no-empty-function
      initialProps: () => {},
    });
    rerender();
    unmount();
  });

  it('should not run on re-renders', async () => {
    const spy1 = vi.fn();
    const spy2 = vi.fn();
    const { rerender, unmount } = renderHook(useUnmount, {
      initialProps: () => spy1(),
    });

    expect(spy1).toBeCalledTimes(0);

    rerender(() => spy2());
    expect(spy1).toBeCalledTimes(0);
    expect(spy2).toBeCalledTimes(0);

    rerender(() => spy2());
    expect(spy1).toBeCalledTimes(0);
    expect(spy2).toBeCalledTimes(0);

    unmount();
    expect(spy1).toBeCalledTimes(0);
    expect(spy2).toBeCalledTimes(1);
  });
});
