import { createMicrotask } from './createMicrotask.js';

describe('createMicrotask', () => {
  it('should wait for end of current task', async () => {
    let value = 0;

    const promise = (async (): Promise<void> => {
      await createMicrotask();
      value = 1;
    })();

    expect(value).toBe(0);

    await promise;

    expect(value).toBe(1);
  });
});
