/**
 * Returns undefined when in a server environment, otherwise returns window.
 *
 * Note: be careful when using this hook, it returns a different value on on server
 * and client.
 */
export function useWindow(): (Window & typeof globalThis) | undefined {
  return typeof window === 'undefined' ? undefined : window;
}
