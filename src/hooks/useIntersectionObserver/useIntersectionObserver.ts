import { useEffect } from 'react';
import { unref, type Unreffable } from '../../utils/unref/unref.js';

/**
 * This hook creates an IntersectionObserver and uses it to observe
 * the target element.
 *
 * For a full explanation of the IntersectionObserver API, check the docs:
 * https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
 *
 * @param target - The target to observe
 * @param callback - The callback to fire when the element resizes
 * @param options - Optional options object
 */

export function useIntersectionObserver(
  target: Unreffable<Element | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): void {
  useEffect(() => {
    const element = unref(target);

    if (element === null) {
      return;
    }

    const intersectionObserverInstance = new IntersectionObserver(callback, options);
    intersectionObserverInstance.observe(element);

    return () => {
      intersectionObserverInstance.disconnect();
    };
  }, [callback, options, target]);
}
