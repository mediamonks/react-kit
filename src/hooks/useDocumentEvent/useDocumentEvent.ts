import { useEffect } from 'react';

/**
 * This hook allows you to add a document event listener and remove it when the component unmounts.
 *
 * @param event - The event to listen for
 * @param callback - The callback to fire when the event is triggered
 */
export function useDocumentEvent<T extends keyof DocumentEventMap>(
  event: T,
  callback: (event: DocumentEventMap[T]) => void,
): void {
  useEffect(() => {
    document.addEventListener(event, callback);

    return () => {
      document.removeEventListener(event, callback);
    };
  }, [event, callback]);
}
