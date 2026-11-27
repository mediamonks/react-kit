export class WaitForTimeoutError extends Error {
  public constructor() {
    super('Timeout error while waiting for condition');
    this.name = 'WaitForTimeoutError';
  }
}

export type WaitForOptions = {
  interval?: number;
  timeout?: number;
};

export function waitFor(
  callback: () => boolean,
  { interval = 10, timeout = 1000 }: WaitForOptions = {},
): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new WaitForTimeoutError());
    }, timeout);

    const intervalId = setInterval(() => {
      if (callback()) {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        resolve();
      }
    }, interval);
  });
}
