import { useRef } from 'react';
import { useMount } from '../useMount/useMount.js';

/**
 * Executes a callback during the initial render, before mounting, but not during subsequent
 * renders.
 *
 * Opposed to `useEffect` / `useMount`, the callback is executed synchronously,
 * before the component is mounted.
 *
 * @param callback A function to be executed during the initial render, before mounting, but not
 * during subsequent renders.
 */
export function useBeforeMount(callback: () => void): void {
  const isBeforeMount = useRef(true);

  if (isBeforeMount.current) {
    callback();
  }

  useMount(() => {
    isBeforeMount.current = false;
  });
}
