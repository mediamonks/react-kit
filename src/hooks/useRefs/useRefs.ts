import { createRef, useMemo, type RefObject } from 'react';

/**
 * Utility to automatically create refs
 */
export function useRefs<T extends Record<string | symbol, RefObject<unknown>>>(
  initialTarget?: Partial<T>,
): T {
  const proxyTarget = useMemo(
    () => initialTarget ?? {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return useMemo(
    () =>
      new Proxy<T>(proxyTarget as T, {
        get(target, prop): unknown {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (target[prop] !== undefined) {
            return target[prop];
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          target[prop] = createRef<T[typeof prop]>();

          return target[prop];
        },
      }),
    [proxyTarget],
  );
}
