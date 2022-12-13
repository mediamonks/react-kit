/**
 * Trim values from end of array
 */
export function trimEnd<T>(target: Array<T>, value?: T): Array<T> {
  while (target.length > 0 && target.at(-1) === value) {
    target.pop();
  }

  return target;
}
