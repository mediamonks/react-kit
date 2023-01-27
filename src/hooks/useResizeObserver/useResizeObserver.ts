import { type RefObject, useEffect } from 'react';

/**
 * This hook allows you to add a ResizeObserver for an element and remove it
 * when the component unmounts.
 *
 * @param ref - The ref to observe
 * @param callback - The callback to fire when the element resizes
 */
export function useResizeObserver(ref: RefObject<Element>, callback: ResizeObserverCallback): void {
  useEffect(() => {
    const resizeObserverInstance = new ResizeObserver(callback);

    if (ref.current === null) {
      throw new Error('`ref.current` is undefined');
    }

    resizeObserverInstance.observe(ref.current);

    return () => {
      resizeObserverInstance.disconnect();
    };
  }, [ref, callback]);
}
