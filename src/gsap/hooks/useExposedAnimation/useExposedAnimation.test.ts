import { renderHook } from '@testing-library/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { useAnimation } from '../useAnimation/useAnimation.js';
import { useExposeAnimation } from '../useExposeAnimation/useExposeAnimation.js';
import { useExposedAnimation } from './useExposedAnimation.js';

describe('useExposedAnimation', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should return undefined', () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));

      return useExposedAnimation(ref);
    });

    expect(hook.result.current).toBeUndefined();
  });

  it('should not return undefined', async () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));

      const animation = useAnimation(() => gsap.to({ value: 0 }, { value: 1 }), []);

      useExposeAnimation(animation, ref);

      return useExposedAnimation(ref);
    });

    expect(hook.result.current).toBeUndefined();
  });
});
