import { useIsMounted } from '../useIsMounted/useIsMounted.js';

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
  const isMounted = useIsMounted();
  if (!isMounted.current) {
    callback();
  }
}
