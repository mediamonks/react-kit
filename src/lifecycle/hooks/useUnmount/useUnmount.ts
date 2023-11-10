import { useEffect } from 'react';
import { useRefValue } from '../../../hooks/useRefValue/useRefValue.js';

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
  const callbackRef = useRefValue(callbackFunction);

  useEffect(
    () => () => {
      callbackRef.current?.();
    },
    [callbackRef],
  );
}
