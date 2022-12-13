/**
 * Trim values from end of array
 */
function trimEnd<T>(target: Array<T>, value: T): Array<T> {
  for (let index = target.length - 1; index >= 0; index--) {
    if (target[index] === value) {
      target.pop();
    } else {
      break;
    }
  }

  return target;
}

/**
 * Creates an array that trims itself after it changes
 */
export function createRefArray<T extends Array<unknown>>(
  initialTarget: T = [] as unknown as T,
): typeof initialTarget {
  let timeout = 0 as unknown as NodeJS.Timeout;

  return new Proxy<typeof initialTarget>(trimEnd(initialTarget, null) as T, {
    set(target, parameter, newValue): boolean {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      target[parameter] = newValue;

      // Use timeouts to minimize array mutations
      clearTimeout(timeout);
      timeout = setTimeout(() => trimEnd(target, null), 0);

      return true;
    },
  });
}
