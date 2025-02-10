import { createRef, type Ref, type RefObject, useMemo } from 'react';

/**
 * A React hook that creates a memoized object reference which can handle both RefObject and function refs.
 * This hook provides a unified way to work with different types of React refs.
 *
 * @example
 * ```tsx
 * // Using with RefObject
 * const elementRef = useRef<HTMLDivElement>(null);
 * const objRef = useObjectRef(elementRef);
 *
 * // Using with function ref
 * const objRef = useObjectRef((element) => {
 *   console.log('Element changed:', element);
 * });
 * ```
 */
export function useObjectRef<T>(ref?: Ref<T>): RefObject<T | null> {
  return useMemo(() => {
    if (ref !== null && ref !== undefined && 'current' in ref) {
      return ref;
    }

    return new Proxy(createRef<T>() as RefObject<T | null>, {
      set(target, prop, newValue): boolean {
        if (prop !== 'current') {
          return false;
        }

        target.current = newValue;

        // Call ref function when it exists
        ref?.(newValue);

        return true;
      },
    });
  }, [ref]);
}
