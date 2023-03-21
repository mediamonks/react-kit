import { debounce } from 'lodash-es';
import { type RefObject, useEffect } from 'react';

const resizeObserverInstanceCallbacks = new Map<Element, ResizeObserverCallback>();
let resizeObserverInstance: ResizeObserver | null = null;

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

    if (!resizeObserverInstance) {
      resizeObserverInstance = new ResizeObserver((entries, observer) => {
        for (const entry of entries) {
          resizeObserverInstanceCallbacks.get(entry.target)?.(entries, observer);
        }
      });
    }

    const element = ref.current;
    const callbackFunction =
      debounceTime === null ? callback : debounce(callback, debounceTime ?? 200);
    resizeObserverInstanceCallbacks.set(element, callbackFunction);
    resizeObserverInstance.observe(element);

    return () => {
      resizeObserverInstance?.unobserve(element);
      resizeObserverInstanceCallbacks.delete(element);
    };
  }, [ref, callback, debounceTime]);
}
