/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { debounce } from 'lodash-es';
import { type RefObject, useEffect } from 'react';

/**
 * This hook allows you to add a ResizeObserver for an element and remove it
 * when the component unmounts.
 *
 * @param ref - The ref to observe
 * @param callback - The callback to fire when the element resizes
 * @param debounceTime - The number in milliseconds the callback is debounced
 */
export function useResizeObserver(
  ref: RefObject<Element>,
  callback: ResizeObserverCallback,
  debounceTime?: number | null,
): void {
  useEffect(() => {
    if (ref.current === null) {
      throw new Error('`ref.current` is undefined');
    }

    const element = ref.current;
    const callbackFunction =
      debounceTime === null ? callback : debounce(callback, debounceTime ?? 200);
    const resizeObserverInstance = new ResizeObserver(callbackFunction);
    resizeObserverInstance.observe(element);

    return () => {
      resizeObserverInstance.unobserve(element);
    };
  }, [ref, callback, debounceTime]);
}
