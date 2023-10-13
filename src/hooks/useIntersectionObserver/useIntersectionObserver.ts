import { useEffect, type RefObject } from 'react';
import { unref } from '../../utils/unref/unref.js';
import { useClientSideValue } from '../useClientSideValue/useClientSideValue.js';
import { useRefValue } from '../useRefValue/useRefValue.js';

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
  targetOrTargets: RefObject<Element | ReadonlyArray<Element | null> | null>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): void {
  const callbackRef = useRefValue(callback);
  const intersectionObserverInstance = useClientSideValue(
    () =>
      new IntersectionObserver(
        (entries, observer) => callbackRef.current?.(entries, observer),
        options,
      ),
  );

  useEffect(() => {
    const targets = Array.isArray(targetOrTargets.current)
      ? targetOrTargets.current
      : [targetOrTargets.current];

    for (const target of targets) {
      const element = unref(target);

      if (element) {
        intersectionObserverInstance?.observe(element);
      }
    }

    return () => {
      for (const target of targets) {
        const element = unref(target);

        if (element) {
          intersectionObserverInstance?.unobserve(element);
        }
      }
    };
  }, [intersectionObserverInstance, targetOrTargets]);
}
