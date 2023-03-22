import { useEffect, useRef } from 'react';

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
  const callbackRef = useRef<(() => void) | undefined>(callbackFunction);
  // update the ref each render so if it change the newest callback will be invoked
  callbackRef.current = callbackFunction;

  useEffect(
    () => () => {
      callbackRef.current?.();
    },
    [],
  );
}
