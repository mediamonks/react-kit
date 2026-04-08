/**
 * Returns a promise that resolves after given amount of time. Use the default
 * value of `0` to wait for the next tick.
 *
 * @param ms - The number of milliseconds to wait before resolving. Defaults to `0`.
 * @param options - Optional options object.
 * @param options.signal - An optional AbortSignal to cancel the timeout. When aborted, the promise rejects with the signal's reason.
 */
export function createTimeout(ms = 0, { signal }: { signal?: AbortSignal } = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    if (signal === undefined) {
      setTimeout(resolve, ms);
      return;
    }

    const onAbort = (): void => {
      clearTimeout(timeoutId);
      reject(signal.reason);
    };

    const timeoutId = setTimeout(() => {
      signal.removeEventListener('abort', onAbort);
      resolve();
    }, ms);

    signal.addEventListener('abort', onAbort, { once: true });
  });
}
