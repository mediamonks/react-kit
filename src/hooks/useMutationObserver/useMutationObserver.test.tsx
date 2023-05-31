import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMutationObserver } from './useMutationObserver.js';

describe('useMutationObserver', () => {
  it('should observe mutations on the target element', async () => {
    const target = document.createElement('div');
    const callback = vi.fn();

    renderHook(() => {
      useMutationObserver(target, callback, { childList: true });
    });

    target.append(document.createElement('span'));

    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should stop observing mutations when the component unmounts', async () => {
    const target = document.createElement('div');
    const callback = vi.fn();

    const { unmount } = renderHook(() => {
      useMutationObserver(target, callback, { childList: true });
    });

    unmount();

    target.append(document.createElement('span'));

    await Promise.resolve();

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not observe mutations when the target is null', () => {
    const callback = vi.fn();

    renderHook(() => {
      useMutationObserver(null, callback, { childList: true });
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
