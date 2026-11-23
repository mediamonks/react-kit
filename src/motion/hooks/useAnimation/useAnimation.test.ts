import { renderHook, waitFor } from '@testing-library/react';
import { animate, type AnimationPlaybackControls } from 'motion';
import { type RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useAnimation } from './useAnimation.js';

function required<T>(value: T | undefined): T {
  if (value === undefined) {
    throw new Error('Expected an animation');
  }

  return value;
}

describe('useAnimation', () => {
  it('should not crash', () => {
    renderHook(() => useAnimation(() => animate({ value: 0 }, { value: 1 }), []));
  });

  it('should return animation and update it when dependencies change', async () => {
    const target = { value: 0 };

    const hook = renderHook<RefObject<AnimationPlaybackControls | undefined>, { value: number }>(
      ({ value }) => useAnimation(() => animate(target, { value }), [value]),
      {
        initialProps: {
          value: 1,
        },
      },
    );

    // Motion writes an object's values in its next frame
    hook.result.current.current?.complete();
    await waitFor(() => {
      expect(target.value).toBe(1);
    });

    hook.rerender({ value: 2 });
    hook.result.current.current?.complete();
    await waitFor(() => {
      expect(target.value).toBe(2);
    });
  });

  it('should stop the animation when unmounted', () => {
    const hook = renderHook(() => useAnimation(() => animate({ value: 0 }, { value: 1 }), []));
    const stop = vi.spyOn(required(hook.result.current.current), 'stop');

    hook.unmount();

    expect(stop).toHaveBeenCalledOnce();
  });

  it('should stop the previous animation when dependencies change', () => {
    const hook = renderHook(
      ({ value }) => useAnimation(() => animate({ value: 0 }, { value }), [value]),
      { initialProps: { value: 1 } },
    );
    const first = hook.result.current.current;
    const stop = vi.spyOn(required(first), 'stop');

    hook.rerender({ value: 2 });

    expect(stop).toHaveBeenCalledOnce();
    expect(hook.result.current.current).not.toBe(first);
  });
});
