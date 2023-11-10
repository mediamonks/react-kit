import { renderHook } from '@testing-library/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { getAnimation } from '../../utils/getAnimation/getAnimation.js';
import { useAnimation } from '../useAnimation/useAnimation.js';
import { useExposeAnimation } from './useExposeAnimation.js';

describe('useExposeAnimation', () => {
  it('should not crash', () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));

      useExposeAnimation(useRef(), ref);

      return {
        ref,
      };
    });

    expect(getAnimation(hook.result.current.ref.current)).toBeUndefined();
  });

  it('should return animation when animation is exposed for reference', () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));
      const animation = useAnimation(() => gsap.to({ value: 0 }, { value: 1 }), []);

      useExposeAnimation(animation, ref);

      return {
        ref,
        animation,
      };
    });

    expect(getAnimation(hook.result.current.ref.current)).not.toBeUndefined();
  });

  it('should return undefined when unmounted', () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));
      const animation = useAnimation(() => gsap.to({ value: 0 }, { value: 1 }), []);

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
