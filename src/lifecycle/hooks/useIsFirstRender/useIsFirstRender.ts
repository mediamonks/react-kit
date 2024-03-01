import { useRef } from 'react';

/**
 * A hook that returns a boolean that is `true` only on first render.
 */
export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}
