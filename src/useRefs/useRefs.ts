import { createRef, useMemo, type RefObject } from 'react';

/**
 * Utility to automatically create refs
 *
 * ```typescript
 * const buttonRef = useRef<Array<HTMLButtonElement>>([]);
 *
 * const refs = useRef<{
 *  heading: RefObject<HTMLHeadingElement | null>
 *  button: RefObject<Array<HTMLButtonElement | null>>
 * }>({
 *   buttonRef
 * })
 * ```
 *
 * refs.heading -> ref automatically created
 * refs.button -> ref from target object
 */
export function useRefs<T extends Record<string | symbol, RefObject<unknown>>>(
  initialTarget?: Record<string | symbol, RefObject<unknown>>,
): T {
  const proxyTarget = useMemo(() => initialTarget ?? {}, []);

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
