/**
 * Returns undefined when in a server environment, otherwise returns document.
 *
 * Note: be careful with this hook as it returns a different value on on server
 * and client.
 */
export function useDocument(): Document | undefined {
  return typeof document === 'undefined' ? undefined : document;
}
