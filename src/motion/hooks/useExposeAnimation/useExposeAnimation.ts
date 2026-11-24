import type { AnimationPlaybackControls } from 'motion';
import { useEffect, type RefObject } from 'react';
import { unref, type Unreffable } from '../../../utils/unref/unref.js';
import { animations } from '../../animations.js';

/**
 * Hook to store a Motion animation using a reference in the global animations map
 */
export function useExposeAnimation(
  animation: RefObject<AnimationPlaybackControls | undefined>,
  reference: Unreffable<unknown>,
): void {
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const _reference = unref(reference);
    // eslint-disable-next-line no-underscore-dangle
    const _animation = animation.current;

    if (_animation && _reference) {
      animations.set(_reference, _animation);
    }

    return () => {
      animations.delete(_reference);
    };

    // Like the GSAP entry, this relies on useAnimation assigning a new animation.current when its
    // dependencies change, which re-renders the component this hook is used in.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation, animation.current, reference]);
}
