/**
 * Trim values from end of array
 */
function trimEnd<T>(target: Array<T>, value: T): Array<T> {
  while (target.at(-1) === value) {
    target.pop();
  }

  return target;
}

/**
 * Creates an array that trims itself after it changes
 */
export function createRefArray<T>(initialTarget: Array<T> = []): typeof initialTarget {
  return new Proxy<typeof initialTarget>(trimEnd(initialTarget, null) as Array<T>, {
    set(target, parameter, newValue): boolean {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      target[parameter] = newValue;

      // Use timeouts to minimize array mutations
      if (newValue === null) {
        trimEnd(target, null);
      }

      return true;
    },
  });
}
