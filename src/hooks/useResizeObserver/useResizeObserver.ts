import { useEffect } from 'react';
import { unref, type Unreffable } from '../../utils/unref/unref.js';
import { useRefValue } from '../useRefValue/useRefValue.js';

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
  const callbackRef = useRefValue(callback);

  useEffect(() => {
    const element = unref(target);

    if (element === null || callback === undefined) {
      return;
    }

    const resizeObserver = new ResizeObserver((..._arguments) => {
      callbackRef.current?.(..._arguments);
    });

    resizeObserver.observe(element, options);

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ...Object.values(options ?? {})]);
}
