import { useEffect, useMemo } from 'react';
import { unref, useRefValue, type Unreffable } from '../../index.js';

/**
 * Hook that sets up a MutationObserver to watch for changes to a DOM element.
 *
 * @example
 * function MyComponent(): ReactElement {
 *   const targetRef = useRef<HTMLElement>(null);
 *
 *   useMutationObserver(targetRef, (mutations, observer) => {
 *     console.log('Mutations observed:', mutations);
 *   }, { childList: true });
 *
 *   return <div ref={targetRef}>Hello, world!</div>;
 * }
 */
export function useMutationObserver(
  target: Unreffable<Element | null>,
  callback: MutationCallback,
  options: MutationObserverInit,
): void {
  const memoizedOptions = useMemo(
    () => options,
    // Options are serializable so we can safely use JSON.stringify for the comparison
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(options)],
  );

  const callbackRef = useRefValue(callback);

  useEffect(() => {
    const element = unref(target);

    if (element === null) {
      return;
    }

    const mutationObserverInstance = new MutationObserver(
      (mutations: Array<MutationRecord>, observer: MutationObserver) => {
        callbackRef.current?.(mutations, observer);
      },
    );

    mutationObserverInstance.observe(element, memoizedOptions);

    return () => {
      mutationObserverInstance.disconnect();
    };
  }, [callbackRef, memoizedOptions, target]);
}
