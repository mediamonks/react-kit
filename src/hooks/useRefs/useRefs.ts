import { createRef, useMemo, useRef, type RefObject } from 'react';

/**
 * Utility to automatically create refs
 */
export function useRefs<T extends Record<string | symbol, RefObject<unknown>>>(
  initialTarget?: Partial<T>,
): T {
  const proxyTarget = useRef<Partial<T>>(initialTarget ?? {});

  return useMemo(
    () =>
      new Proxy(proxyTarget.current, {
        get(target, prop): unknown {
          if (target[prop] !== undefined) {
            return target[prop];
          }

          // @ts-expect-error - the type cannot be correctly inferred from the prop name because it is a symbol or string
          target[prop] = createRef();

          return target[prop];
        },
      }) as T,
    [],
  );
}
