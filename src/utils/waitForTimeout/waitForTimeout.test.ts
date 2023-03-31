import { waitForTimeout } from './waitForTimeout.js';

describe('waitForTimeout', () => {
  it('should wait for a tick', async () => {
    let value = 0;

    const promise = (async (): Promise<void> => {
      await waitForTimeout();
      value = 1;
    })();

    expect(value).toBe(0);

    await promise;

    expect(value).toBe(1);
  });

  it('should wait for given duration', async () => {
    const timeout = 250;
    const startTime = Date.now();

    await waitForTimeout(timeout);

    const currentTime = Date.now();

    expect(currentTime - startTime >= timeout).toBe(true);
  });
});
