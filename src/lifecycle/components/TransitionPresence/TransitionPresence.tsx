import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type RefObject,
} from 'react';
import { childrenAreEqual } from '../../../_utils/childrenAreEqual.js';
import { useRefValue } from '../../../hooks/useRefValue/useRefValue.js';
import { createTimeout } from '../../../index.js';
import {
  useTransitionPresenceBeforeUnmount,
  type BeforeUnmountCallback,
} from '../../hooks/useBeforeUnmount/useBeforeUnmount.js';
import { TransitionPresenceContext } from './TransitionPresence.context.js';

export type TransitionPresenceProps = {
  children: ReactElement | null;
  onPreviousChildrenUnmounting?(
    previousChildren: ReactElement | null,
    children: ReactElement | null,
  ): void | Promise<void>;
  onPreviousChildrenUnmounted?(
    previousChildren: ReactElement | null,
    children: ReactElement | null,
  ): void | Promise<void>;
  onChildrenMounted?(
    previousChildren: ReactElement | null,
    children: ReactElement | null,
  ): void | Promise<void>;
};

/**
 * Will defer transition in new children by waiting on the
 * `BeforeUnmountCallback`s that are registered using the `useBeforeUnmount`
 * hook.
 */
export function TransitionPresence({
  children,
  onPreviousChildrenUnmounting,
  onPreviousChildrenUnmounted,
  onChildrenMounted,
}: TransitionPresenceProps): ReactElement {
  const beforeUnmountCallbacks = useMemo(() => new Set<RefObject<BeforeUnmountCallback>>(), []);
  const [previousChildren, setPreviousChildren] = useState<typeof children>(children);

  const onPreviousChildrenUnmountingRef = useRefValue(onPreviousChildrenUnmounting);
  const onPreviousChildrenUnmountedRef = useRefValue(onPreviousChildrenUnmounted);
  const onChildrenMountedRef = useRefValue(onChildrenMounted);

  const beforeUnmountPreviousChildren = useCallback(
    async (abortSignal: AbortSignal) => {
      const promises: Array<ReturnType<BeforeUnmountCallback>> = [];

      for (const callback of beforeUnmountCallbacks) {
        promises.push(callback.current?.(abortSignal));
      }

      await Promise.all(promises);
    },
    [beforeUnmountCallbacks],
  );

  useEffect(() => {
    if (childrenAreEqual(children, previousChildren)) {
      setPreviousChildren(children);
      return;
    }

    const abortController = new AbortController();

    (async (): Promise<void> => {
      try {
        onPreviousChildrenUnmountingRef.current?.(previousChildren, children);

        // Defer children update for before unmount lifecycle
        await beforeUnmountPreviousChildren(abortController.signal);

        setPreviousChildren(null);

        // Wait a tick after removing previous children to make sure new children
        // are re-initialized
        await createTimeout(0, { signal: abortController.signal });

        onPreviousChildrenUnmountedRef.current?.(previousChildren, children);

        // Set new children
        setPreviousChildren(children);
        await createTimeout(0, { signal: abortController.signal });

        onChildrenMountedRef.current?.(previousChildren, children);
      } catch (error) {
        if (error !== abortController.signal.reason) {
          throw new Error(`Unexpected error in TransitionPresence transition`, { cause: error });
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [
    beforeUnmountCallbacks,
    beforeUnmountPreviousChildren,
    children,
    onChildrenMountedRef,
    onPreviousChildrenUnmountedRef,
    onPreviousChildrenUnmountingRef,
    previousChildren,
  ]);

  // Apply same effect when TransitionPresence in tree updates
  useTransitionPresenceBeforeUnmount(beforeUnmountPreviousChildren);

  return (
    <TransitionPresenceContext.Provider value={beforeUnmountCallbacks}>
      {previousChildren}
    </TransitionPresenceContext.Provider>
  );
}
