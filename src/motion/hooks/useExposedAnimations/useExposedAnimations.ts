import type { AnimationPlaybackControls } from 'motion';
import { useEffect, useState } from 'react';
import { unref, type Unreffable } from '../../../utils/unref/unref.js';
import { animations } from '../../animations.js';

/**
 * Hook to get Motion animations from the global animations map using given references
 */
export function useExposedAnimations<
  T extends AnimationPlaybackControls = AnimationPlaybackControls,
>(target: Unreffable<ReadonlyArray<unknown> | null>): ReadonlyArray<T | undefined> {
  const [exposedAnimations, setExposedAnimations] = useState<ReadonlyArray<T | undefined>>([]);

  useEffect(
    () =>
      animations.listen(() => {
        const array = unref(target);

        if (array) {
          const newAnimations = array.map((ref) => animations.get(ref) as T | undefined);
          // this should only be done when the refs have been updated, otherwise we're returning
          // a new array ref with the same values, which will cause a re-render
          setExposedAnimations((currentAnimations) =>
            areArraysEqual(newAnimations, currentAnimations) ? currentAnimations : newAnimations,
          );
        }
      }),
    [target],
  );

  return exposedAnimations;
}

function areArraysEqual<T>(a: ReadonlyArray<T>, b: ReadonlyArray<T>): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (const [index, element] of a.entries()) {
    if (element !== b[index]) {
      return false;
    }
  }

  return true;
}
