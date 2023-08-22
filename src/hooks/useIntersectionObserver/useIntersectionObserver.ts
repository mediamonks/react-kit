import { useEffect } from 'react';
import { unref, type Unreffable } from '../../utils/unref/unref.js';

/**
 * This hook creates an IntersectionObserver and uses it to observe
 * the target element.
 *
 * For a full explanation of the IntersectionObserver API, check the docs:
 * https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
 *
 * @param targetOrTargets - The target or targets to observe
 * @param callback - The callback to fire when the element resizes
 * @param options - Optional options object
 */

export function useIntersectionObserver(
  targetOrTargets: Unreffable<Element | null> | Array<Unreffable<Element | null>>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): void {
  useEffect(() => {
    const elements = (Array.isArray(targetOrTargets) ? targetOrTargets : [targetOrTargets]).map(
      (target) => unref(target),
    );

    const intersectionObserverInstance = new IntersectionObserver(callback, options);
    for (const element of elements) {
      if (element) {
        intersectionObserverInstance.observe(element);
      }
    }

    return () => {
      intersectionObserverInstance.disconnect();
    };
  }, [callback, options, targetOrTargets]);
}
