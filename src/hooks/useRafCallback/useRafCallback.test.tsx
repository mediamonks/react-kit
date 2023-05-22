import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRafCallback } from './useRafCallback.js';

describe('useRafCallback', () => {
  it('should not crash', async () => {
    const spy = vi.fn();
    renderHook(() => useRafCallback(spy));
  });

  it('should return a function', async () => {
    const spy = vi.fn();
    renderHook(() => useRafCallback(spy));
    const {
      result: { current: callback },
    } = renderHook(() => useRafCallback(spy));

    expect(callback).toBeInstanceOf(Function);
  });

  it('should call callback once during animation frame', async () => {
    const spy = vi.fn();

    const {
      result: { current: callback },
    } = renderHook(() => useRafCallback(spy));

    callback();
    callback();

    await new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });

    expect(spy).toBeCalledTimes(1);

    callback();
    callback();

    await new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });

    expect(spy).toBeCalledTimes(2);
  });
});
