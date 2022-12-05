import type { MutableRefObject } from 'react';

/**
 * Helper to set element in RefObject<Array>
 */
export function arrayRef<T extends MutableRefObject<Array<unknown> | null>>(
  ref: T,
  index: number,
): (element: NonNullable<T['current']>[number]) => void {
  return (element) => {
    if (ref.current === null) {
      // eslint-disable-next-line no-console
      console.warn('ref.current is undefined');
      return;
    }

    ref.current[index] = element;
  };
}
