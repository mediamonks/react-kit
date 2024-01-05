import { useEffect } from 'react';

/**
 * React lifecycle hook that calls a function after the component is mounted.
 * @param callbackFunction function to be called when the component is mounted
 *
 * @example
 * useMount(() => {
 *   console.log('component is mounted');
 * })
 *
 * useMount(async () => {
 *   console.log('component is mounted');
 * })
 */
export function useMount(callbackFunction: () => void | PromiseLike<void>): void {
  useEffect(
    () => {
      callbackFunction();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
