import { useState } from 'react';
import { useMount } from '../useMount/useMount.js';

/**
 * Exposes the mounted state that is updated after the component is mounted.
 *
 * This hook uses setState to update the state after the component is mounted, which means that
 * the component will be re-rendered after the first render.
 *
 * @returns A boolean indicating whether the component is mounted.
 */
export function useIsMountedState(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useMount(() => {
    setIsMounted(true);
  });

  return isMounted;
}
