import { describe, expect, it } from 'vitest';
import { createTimeout } from './createTimeout.js';

describe('createTimeout', () => {
  it('should wait for a tick', async () => {
    let value = 0;

    const promise = (async (): Promise<void> => {
      await createTimeout();
      value = 1;
    })();

    expect(value).toBe(0);

    await promise;

    expect(value).toBe(1);
  });

  it('should wait for given duration', async () => {
    const timeout = 250;
    const startTime = Date.now();

    await createTimeout(timeout);

    const currentTime = Date.now();

    expect(currentTime - startTime >= timeout).toBe(true);
  });

  it('should reject immediately when signal is already aborted', async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(createTimeout(100, { signal: controller.signal })).rejects.toThrow();
  });

  it('should reject when signal is aborted before timeout', async () => {
    const controller = new AbortController();

    const promise = createTimeout(1000, { signal: controller.signal });

    controller.abort();

    await expect(promise).rejects.toThrow();
  });

  it('should resolve normally when no signal is provided', async () => {
    await expect(createTimeout(0)).resolves.toBeUndefined();
  });

  it('should reject with the abort reason', async () => {
    const controller = new AbortController();
    const reason = new Error('custom abort reason');
    controller.abort(reason);

    await expect(createTimeout(100, { signal: controller.signal })).rejects.toThrow(
      'custom abort reason',
    );
  });
});
