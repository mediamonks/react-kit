import { useEventListener } from '../useEventListener/useEventListener.js';

/**
 * SSR-safe hook that adds an event listener to the window.
 */
export function useWindowEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void {
  useEventListener(typeof window === 'undefined' ? undefined : window, type, listener, options);
}
