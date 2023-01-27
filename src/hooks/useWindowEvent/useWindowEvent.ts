import { useEffect } from 'react';

/**
 * This hook allows you to add a window event listener and remove it when the component unmounts.
 *
 * @param event - The event to listen for
 * @param callback - The callback to fire when the event is triggered
 */
export function useWindowEvent<T extends keyof WindowEventMap>(
  event: T,
  callback: (event: WindowEventMap[T]) => void,
): void {
  useEffect(() => {
    window.addEventListener(event, callback);

    return () => {
      window.removeEventListener(event, callback);
    };
  }, [event, callback]);
}
