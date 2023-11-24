import { useEffect } from 'react';
import { unref, type Unreffable } from '../../utils/unref/unref.js';

/**
 * This hook allows you to add a ResizeObserver for an element and remove it
 * when the component unmounts.
 *
 * @param target - The target to observe
 * @param callback - The callback to fire when the element resizes
 */
export function useResizeObserver(
  target: Unreffable<Element | null>,
  callback?: ResizeObserverCallback | undefined,
): void {
  useEffect(() => {
    const element = unref(target);

    if (element === null || callback === undefined) {
      return;
    }

    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [target, callback]);
}
