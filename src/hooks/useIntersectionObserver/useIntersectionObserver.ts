import { useEffect } from 'react';
import { unref, type Unreffable } from '../../utils/unref/unref.js';
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

type Dependencies = Array<
  | IntersectionObserverCallback
  | IntersectionObserverInit
  | Array<Unreffable<Element | null>>
  | Unreffable<Element | null>
  | undefined
>;

export function useIntersectionObserver(
  targetOrTargets: Array<Unreffable<Element | null>> | Unreffable<Element> | null,
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

  const dependencies: Dependencies = [callback, options, intersectionObserverInstance];
  const isMultipleTargets = Array.isArray(targetOrTargets);

  if (isMultipleTargets) {
    dependencies.push(...targetOrTargets);
  } else {
    dependencies.push(targetOrTargets);
  }

  useEffect(() => {
    const elements = (isMultipleTargets ? targetOrTargets : [targetOrTargets]).map(
      (target) => target,
    );

    for (const element of elements) {
      const unreffedElement = unref(element);

      if (unreffedElement) {
        intersectionObserverInstance?.observe(unreffedElement);
      }
    }

    return () => {
      for (const element of elements) {
        const unreffedElement = unref(element);

        if (unreffedElement) {
          intersectionObserverInstance?.unobserve(unreffedElement);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
