import { type RefObject, useEffect, useRef } from 'react';

/**
 * Keeps track of whether the component is mounted, and returns a ref object that is updated
 * accordingly.
 *
 * - `isMounted.current` is `false` before the component is mounted
 * - `isMounted.current` is `true` after the component is mounted
 * - `isMounted.current` is `false` during the unmount cleanup phase and after the component is
 *   unmounted
 *
 * @returns A boolean ref object that reflects whether the component is mounted.
 */
export function useIsMounted(): RefObject<boolean> {
  const isMounted = useRef(false);

  useEffect(() => {
    let unmounted = false;

    // Delay setting this to true until all other useEffects have run
    // however, this can be too late if there are any "setState" actions inside
    // the other useEffects that cause an immediate re-render in the same tick.
    // This is okay, since multiple renders in the same tick can still be considered
    // as the mounting phase, and very rare.
    queueMicrotask(() => {
      if (unmounted) {
        return;
      }

      isMounted.current = true;
    });

    return () => {
      unmounted = true;
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
