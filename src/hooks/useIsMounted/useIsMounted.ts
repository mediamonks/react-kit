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
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
