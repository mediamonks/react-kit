// use an arbitrary large number instead of a toggle boolean to avoid potential optimization issues
// when called multiple times in a single render, but have a cap to avoid overflow
import { useReducer } from 'react';

const updateReducer = (value: number): number => (value + 1) % Number.MAX_SAFE_INTEGER;

/**
 * Forces a rerender of the component when the returned function is called.
 *
 * This should only be used when there is no other state that can be used to trigger a rerender.
 *
 * Examples could be to force a rerender after a timeout or interval, to compare the current time
 * (that changes) with the time when the component was last updated.
 *
 * @returns A function that can be called to force a rerender.
 */
export function useForceRerender(): () => void {
  const [, update] = useReducer(updateReducer, 0);

  return update;
}
