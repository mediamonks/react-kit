import { useState } from 'react';

/**
 * Keep track of a value that is initialized once and then never changes.
 *
 * This behavior is similar to `useState`, but the value is never updated.
 */
export function useStaticValue<T>(initializeFunction: (() => T) | T): T {
  // eslint-disable-next-line react/hook-use-state
  const [value] = useState(initializeFunction);

  return value;
}
