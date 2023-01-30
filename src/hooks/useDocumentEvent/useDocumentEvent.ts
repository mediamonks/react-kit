import { useEventListener } from '../useEventListener/useEventListener.js';

/**
 * SSR-safe hook that adds an event listener to the document.
 */
export function useDocumentEvent<K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void {
  useEventListener(typeof document === 'undefined' ? undefined : document, type, listener, options);
}
