import { renderHook } from '@testing-library/react';
import { animate, type AnimationPlaybackControls } from 'motion';
import { useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { getAnimation } from '../../utils/getAnimation/getAnimation.js';
import { useAnimation } from '../useAnimation/useAnimation.js';
import { useExposeAnimation } from './useExposeAnimation.js';

describe('useExposeAnimation', () => {
  it('should not crash', () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));

      // eslint-disable-next-line unicorn/no-useless-undefined
      useExposeAnimation(useRef<AnimationPlaybackControls>(undefined), ref);

      return {
        ref,
      };
    });

    expect(getAnimation(hook.result.current.ref.current)).toBeUndefined();
  });

  it('should return animation when animation is exposed for reference', () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));
      const animation = useAnimation(() => animate({ value: 0 }, { value: 1 }), []);

      useExposeAnimation(animation, ref);

      return {
        ref,
        animation,
      };
    });

    expect(getAnimation(hook.result.current.ref.current)).toBe(
      hook.result.current.animation.current,
    );
  });

  it('should return undefined when unmounted', () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));
      const animation = useAnimation(() => animate({ value: 0 }, { value: 1 }), []);

      useExposeAnimation(animation, ref);

      return {
        ref,
        animation,
      };
    });

    hook.unmount();

    expect(getAnimation(hook.result.current.ref.current)).toBeUndefined();
  });
});
