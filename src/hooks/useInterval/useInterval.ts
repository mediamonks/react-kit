import { useEffect, useRef } from 'react';
import { useRefValue } from '../useRefValue/useRefValue.js';

/**
 * A hook that sets up an interval to repeatedly call a callback function.
 *
 * @param callback - The function to be called repeatedly.
 * @param ms - The number of milliseconds between each call to the callback function. Defaults to 0.
 * @param enabled - Whether the interval should be enabled. Defaults to true.
 */
export function useInterval(callback: () => void, ms?: number, enabled = true): void {
  const callbackRef = useRefValue(callback);
  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (!enabled) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      callbackRef.current?.();
    }, ms);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [callbackRef, enabled, ms]);
}
