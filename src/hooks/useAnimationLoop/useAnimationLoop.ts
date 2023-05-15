import { useCallback, useEffect, useRef } from 'react';
import { useRefValue } from '../useRefValue/useRefValue.js';

/**
 * useAnimationLoop hook is a wrapper around requestAnimationFrame method.
 * This hook will execute a callback function every next frame.
 *
 * @param callback - callback function with @param delta which represents time passed since last invocation
 * @param enabled - boolean which is used to play and pause the requestAnimationFrame
 */
export function useAnimationLoop(callback: FrameRequestCallback, enabled = true): void {
  const animationFrameRef = useRef(0);
  const callbackRef = useRefValue(callback);

  const tick = useCallback<FrameRequestCallback>(
    (time) => {
      callbackRef.current?.(time);
      animationFrameRef.current = requestAnimationFrame(tick);
    },
    [callbackRef],
  );

  useEffect(() => {
    if (enabled) {
      requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [enabled, tick]);
}
