import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useUnmount } from './useUnmount';

describe('useUnmount', () => {
  it('should not crash', async () => {
    const { rerender, unmount } = renderHook(useUnmount, {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      initialProps: () => {},
    });
    rerender();
    unmount();
  });

  it('should not run on re-renders', async () => {
    const spy = jest.fn();
    const { rerender, unmount } = renderHook(useUnmount, {
      initialProps: () => spy(),
    });

    expect(spy).toBeCalledTimes(0);
    rerender();
    expect(spy).toBeCalledTimes(0);
    rerender();
    expect(spy).toBeCalledTimes(0);
    unmount();
    expect(spy).toBeCalledTimes(1);
  });
});
