import { useContext, useEffect } from 'react';
import { useRefValue } from '../../../hooks/useRefValue/useRefValue.js';
import { TransitionPresenceContext } from '../../components/TransitionPresence/TransitionPresence.context.js';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type BeforeUnmountCallback = (abortSignal: AbortSignal) => PromiseLike<unknown> | void;

/**
 * Executes async callback to defer unmounting of children in nearest
 * TransitionPresence boundary
 */
export function useBeforeUnmount(callback: BeforeUnmountCallback): void {
  const transitionPresence = useContext(TransitionPresenceContext);
  const callbackRef = useRefValue(callback);

  if (transitionPresence === undefined) {
    // eslint-disable-next-line no-console
    console.warn('Component is not rendered in the context of a TransitionPresence');
  }

  useEffect(() => {
    queueMicrotask(() => {
      transitionPresence?.add(callbackRef);
    });

    return () => {
      transitionPresence?.delete(callbackRef);
    };
  }, [transitionPresence, callbackRef]);
}

/**
 * useBeforeUnmount without the warning, this should only be used within the
 * <TransitionPresence> component in this package.
 */
export function useTransitionPresenceBeforeUnmount(callback: BeforeUnmountCallback): void {
  const transitionPresence = useContext(TransitionPresenceContext);
  const callbackRef = useRefValue(callback);

  useEffect(() => {
    queueMicrotask(() => {
      transitionPresence?.add(callbackRef);
    });

    return () => {
      transitionPresence?.delete(callbackRef);
    };
  }, [transitionPresence, callbackRef]);
}
