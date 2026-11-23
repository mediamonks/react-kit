import { renderHook, waitFor } from '@testing-library/react';
import { animate } from 'motion';
import { useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { useAnimation } from '../useAnimation/useAnimation.js';
import { useExposeAnimation } from '../useExposeAnimation/useExposeAnimation.js';
import { useExposedAnimation } from './useExposedAnimation.js';

describe('useExposedAnimation', () => {
  it('should return undefined when nothing is exposed', () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));

      return useExposedAnimation(ref);
    });

    expect(hook.result.current).toBeUndefined();
  });

  it('should return the animation exposed for the reference', async () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));
      const animation = useAnimation(() => animate({ value: 0 }, { value: 1 }), []);

      useExposeAnimation(animation, ref);

      return { animation, exposed: useExposedAnimation(ref) };
    });

    await waitFor(() => {
      expect(hook.result.current.exposed).toBe(hook.result.current.animation.current);
    });
  });
});
