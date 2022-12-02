import type { ForwardedRef } from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect';

/**
 * Syncs the forwardRef element with the internal ref element
 * @param refs Object of Refs that are used by the `useRegisterRef` hook
 * @param key String of the key that is used in the `refs` object
 * @param forwardRef The forwardRef element that comes from the forwardRef function
 *
 * forwardRef<HTMLDivElement>((props, forwardRef): ReactElement => {
 *   const [refs, registerRef] = useRegisterRef<TransitionRefs>();
 *   useSyncRegisterRef(refs, 'element', forwardRef);
 *
 *   return (
 *     <div ref={registerRef('element')}>
 *     </div>
 *   )
 * });
 */
export function useSyncRegisterRef<T extends Record<string, unknown>, K extends keyof T>(
  refs: T,
  key: K,
  forwardRef: ForwardedRef<T[K]>,
): void {
  useIsomorphicLayoutEffect(() => {
    if (!forwardRef) {
      return;
    }

    const element = refs[key];

    if (typeof forwardRef === 'function') {
      forwardRef(element);
      return;
    }

    if ('current' in forwardRef) {
      // eslint-disable-next-line no-param-reassign
      forwardRef.current = element;
    }
  }, [forwardRef]);
}
