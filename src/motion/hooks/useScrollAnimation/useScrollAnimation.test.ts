import { renderHook } from '@testing-library/react';
import { animate } from 'motion';
import type * as Motion from 'motion';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useScrollAnimation } from './useScrollAnimation.js';

function required<T>(value: T | undefined): T {
  if (value === undefined) {
    throw new Error('Expected an animation');
  }

  return value;
}

const { removeScroll, scroll } = vi.hoisted(() => {
  const remove = vi.fn();

  return { removeScroll: remove, scroll: vi.fn(() => remove) };
});

vi.mock('motion', async (importOriginal) => ({
  ...(await importOriginal<typeof Motion>()),
  scroll,
}));

describe('useScrollAnimation', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should link the animation to scroll with the options', () => {
    const target = document.createElement('div');

    const hook = renderHook(() =>
      useScrollAnimation(
        () => animate({ value: 0 }, { value: 1 }),
        [],
        () => ({ target, offset: ['start end', 'end start'] }),
      ),
    );

    expect(scroll).toHaveBeenCalledWith(hook.result.current.current, {
      target,
      offset: ['start end', 'end start'],
    });
  });

  it('should not link to scroll without an animation', () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    renderHook(() => useScrollAnimation(() => undefined, []));

    expect(scroll).not.toHaveBeenCalled();
  });

  it('should remove the link and stop the animation when unmounted', () => {
    const hook = renderHook(() =>
      useScrollAnimation(() => animate({ value: 0 }, { value: 1 }), []),
    );
    const animation = hook.result.current.current;
    const stop = vi.spyOn(required(animation), 'stop');

    hook.unmount();

    expect(removeScroll).toHaveBeenCalledOnce();
    expect(stop).toHaveBeenCalledOnce();
  });

  it('should create a new animation when the dependencies change', () => {
    const hook = renderHook(
      ({ value }) => useScrollAnimation(() => animate({ value: 0 }, { value }), [value]),
      { initialProps: { value: 1 } },
    );

    hook.rerender({ value: 2 });

    expect(scroll).toHaveBeenCalledTimes(2);
    expect(removeScroll).toHaveBeenCalledOnce();
  });
});
