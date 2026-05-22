import { useRef, useCallback } from 'react';

/**
 * Checks a sequence of items against a predicate and calls a callback when the sequence is complete.
 * Each item is checked against an input value (for each step), and if the predicate succeeds, we increase the index.
 * If the predicate fails, or if the debounce timeout has passed, we reset the index.
 *
 * @param items The sequence of items to check
 * @param predicate A function that takes an item and the input and returns true if the input is valid,
 *                  after which it progresses to the next item in the sequence.
 * @param callback A function that is called when the sequence is complete
 * @param debounce The debounce time in milliseconds, the time between each input before resetting the index.
 * @returns An object with a `check` method that takes an input, which can be called from the outside, and triggers the predicate.
 */
export function useSequence<T, I>(
  items: Array<T>,
  predicate: (item: T, input: I) => boolean | undefined,
  callback: (input: I) => void,
  debounce: number = 1000,
): { check(input: I): void } {
  const indexRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset index and timer
  const reset = useCallback((): void => {
    indexRef.current = 0;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Start the debounce timer
  const startTimer = useCallback((): void => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      reset();
    }, debounce);
  }, [debounce, reset]);

  const check = useCallback(
    (input: I) => {
      startTimer();

      // When returned undefined, we don't do anything
      // For example, for keyboard shortcuts, when pressing modifier keys, they won't match anything,
      // but we don't want to "abort" the sequence.
      // We could just not call `check` from the outside, but it's nice that this way we reset the timer,
      // giving the user slightly more time to press complex modifier keys.
      const isMatch = predicate(items[indexRef.current], input);

      if (isMatch === true) {
        indexRef.current++;

        // check if we have reached the end
        if (indexRef.current >= items.length) {
          reset();
          callback(input);
        }
      } else if (isMatch === false) {
        // TODO: should we re-check a failed predicate after resetting the index?
        // TODO: or should we keep the input history and re-check the inputs against
        //  the sequence to see if there is a overlapping start at some point?
        reset();
      }
    },
    [items, predicate, callback, startTimer, reset],
  );

  return { check };
}
