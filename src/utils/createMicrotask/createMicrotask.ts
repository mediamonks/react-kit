/**
 * Creates a promise that resolves at the end of the current Task.
 */
export function createMicrotask(): Promise<void> {
  return Promise.resolve();
}
