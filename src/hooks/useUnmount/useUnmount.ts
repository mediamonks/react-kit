import { useEffect } from 'react';

/**
 * React lifecycle hook that calls a function after the component is unmounted.
 * @param callbackFunction function to be called when the component is unmounted
 *
 * @example
 * ```
 * useUnmount(() => {
 *   console.log('component is unmounted');
 * })
 * ```
 */
export function useUnmount(callbackFunction: () => void): void {
  useEffect(
    () => callbackFunction,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
