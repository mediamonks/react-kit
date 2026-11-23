import { renderHook, waitFor } from '@testing-library/react';
import { animate } from 'motion';
import { useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { useAnimation } from '../useAnimation/useAnimation.js';
import { useExposeAnimation } from '../useExposeAnimation/useExposeAnimation.js';
import { useExposedAnimations } from './useExposedAnimations.js';

describe('useExposedAnimations', () => {
  it('should return an empty array when nothing is exposed', () => {
    const hook = renderHook(() => useExposedAnimations([Symbol('reference')]));

    expect(hook.result.current).toEqual([]);
  });

  it('should return the animations exposed for the references', async () => {
    const hook = renderHook(() => {
      const first = useRef(Symbol('first'));
      const second = useRef(Symbol('second'));
      const references = useRef([first.current, second.current]);

      const firstAnimation = useAnimation(() => animate({ value: 0 }, { value: 1 }), []);
      const secondAnimation = useAnimation(() => animate({ value: 0 }, { value: 1 }), []);

      useExposeAnimation(firstAnimation, first);
      useExposeAnimation(secondAnimation, second);

      return {
        firstAnimation,
        secondAnimation,
        exposed: useExposedAnimations(references),
      };
    });

    await waitFor(() => {
      expect(hook.result.current.exposed).toEqual([
        hook.result.current.firstAnimation.current,
        hook.result.current.secondAnimation.current,
      ]);
    });
  });
});
