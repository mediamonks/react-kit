import type { AnimationPlaybackControls } from 'motion';
import { useEffect, useState } from 'react';
import { unref, type Unreffable } from '../../../utils/unref/unref.js';
import { animations } from '../../animations.js';

/**
 * Hook to get a Motion animation from the global animations map using given reference
 */
export function useExposedAnimation<T extends AnimationPlaybackControls>(
  target: Unreffable<unknown>,
): T | undefined {
  const [animation, setAnimation] = useState<T | undefined>();

  useEffect(
    () =>
      animations.listen(() => {
        setAnimation(animations.get(unref(target)) as T | undefined);
      }),
    [target],
  );

  return animation;
}
