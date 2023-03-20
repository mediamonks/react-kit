import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useBeforeMount } from './useBeforeMount.js';

describe('useBeforeMount', () => {
  it('should not crash', async () => {
    renderHook(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      useBeforeMount(() => {});
    });
  });

  it('should execute a callback on first render', async () => {
    const spy = jest.fn();
    renderHook(() => {
      useBeforeMount(spy);
    });
    expect(spy).toBeCalledTimes(1);
  });

  it('should not execute a callback on re-renders', async () => {
    const spy = jest.fn();
    const { rerender } = renderHook(() => {
      useBeforeMount(spy);
    });
    expect(spy).toBeCalledTimes(1);
    rerender();
    expect(spy).toBeCalledTimes(1);
    rerender();
    expect(spy).toBeCalledTimes(1);
  });
});
