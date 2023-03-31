/**
 * Returns a promise that resolves after given amount of time. Use the default
 * value of `0` to wait for the next tick.
 */
export function waitForTimeout(ms = 0): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
