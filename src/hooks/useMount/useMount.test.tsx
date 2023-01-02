import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useMount } from './useMount.js';

describe('useMount', () => {
  it('should not crash', async () => {
    renderHook(useMount, {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      initialProps: () => {},
    });
  });

  it('should not run on re-renders', async () => {
    const spy = jest.fn();
    const { rerender, unmount } = renderHook(useMount, {
      initialProps: () => spy(),
    });

    expect(spy).toBeCalledTimes(1);
    rerender();
    expect(spy).toBeCalledTimes(1);
    rerender();
    expect(spy).toBeCalledTimes(1);
    unmount();
    expect(spy).toBeCalledTimes(1);
  });
});
