import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { createMicrotask } from '../../index.js';
import { useMutationObserver } from './useMutationObserver.js';

describe('useMutationObserver', () => {
  it('should observe mutations on the target element', async () => {
    const target = document.createElement('div');
    const callback = jest.fn();

    renderHook(() => {
      useMutationObserver(target, callback, { childList: true });
    });

    target.append(document.createElement('span'));

    await createMicrotask();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should stop observing mutations when the component unmounts', async () => {
    const target = document.createElement('div');
    const callback = jest.fn();

    const { unmount } = renderHook(() => {
      useMutationObserver(target, callback, { childList: true });
    });

    unmount();

    target.append(document.createElement('span'));

    await createMicrotask();

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not observe mutations when the target is null', () => {
    const callback = jest.fn();

    renderHook(() => {
      useMutationObserver(null, callback, { childList: true });
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
