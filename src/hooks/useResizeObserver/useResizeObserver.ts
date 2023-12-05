import { useEffect } from 'react';
import { unref, type Unreffable } from '../../utils/unref/unref.js';

/**
 * This hook allows you to add a ResizeObserver for an element and remove it
 * when the component unmounts.
 *
 * @param target - The target to observe
 * @param callback - The callback to fire when the element resizes
 * @param options - The ResizeObserverOptions for the observed element
 */
export function useResizeObserver(
  target: Unreffable<Element | null>,
  callback?: ResizeObserverCallback | undefined,
  options?: ResizeObserverOptions,
): void {
  useEffect(() => {
    const element = unref(target);

    if (element === null || callback === undefined) {
      return;
    }

    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(element, options);

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, callback, ...Object.values(options ?? {})]);
}
