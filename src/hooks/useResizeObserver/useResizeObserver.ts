import { useEffect } from 'react';
import { unref, type Unreffable } from '../../index.js';
import { useRefValue } from '../useRefValue/useRefValue.js';

/**
 * This hook allows you to add a ResizeObserver to an element and remove it
 * when the component unmounts.
 *
 * @param ref - The ref to observe
 * @param callback - The callback to fire when the element resizes
 */
export function useResizeObserver(
  target: Unreffable<Element | null>,
  callback: ResizeObserverCallback,
): void {
  const callbackRef = useRefValue(callback);

  useEffect(() => {
    const element = unref(target);

    if (element === null) {
      return;
    }

    const resizeObserverInstance = new ResizeObserver(
      (entries: Array<ResizeObserverEntry>, observer: ResizeObserver) => {
        callbackRef.current?.(entries, observer);
      },
    );

    resizeObserverInstance.observe(element);

    return () => {
      resizeObserverInstance.disconnect();
    };
  }, [callbackRef, target]);
}
