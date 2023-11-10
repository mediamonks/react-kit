import { useEffect, useState } from 'react';
import { unref, type Unreffable } from '../../../index.js';
import { animations } from '../../animations.js';

/**
 * Hook to get animation from global animations map using given reference
 */
export function useExposedAnimation<T extends gsap.core.Animation>(
  target: Unreffable<unknown>,
): T | undefined {
  const [animation, setAnimation] = useState<T | undefined>();

  useEffect(
    () =>
      animations.listen(() => {
        setAnimation(animations.get(unref(target)));
      }),
    [target],
  );

  return animation;
}
