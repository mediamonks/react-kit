import { useCallback, useEffect, useRef } from 'react';
import { useRefValue } from '../useRefValue/useRefValue.js';

/**
 * useAnimationLoop hook is a wrapper around requestAnimationFrame method.
 * This hook will execute a callback function every next frame.
 *
 * @param callback - callback function with @param delta which represents time passed since last invocation
 * @param enabled - boolean which is used to play and pause the requestAnimationFrame
 */
export function useAnimationLoop(callback: (delta: number) => void, enabled = false): void {
  const animationFrameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const callbackRef = useRefValue(callback);

  const tick = useCallback(
    (time: number): void => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      callbackRef.current?.(delta);

      animationFrameRef.current = requestAnimationFrame(tick);
    },
    [callbackRef],
  );

  const play = useCallback(() => {
    lastTimeRef.current = performance.now();
    requestAnimationFrame(tick);
  }, [tick]);

  const pause = useCallback(() => {
    cancelAnimationFrame(animationFrameRef.current);
  }, []);

  useEffect(() => {
    if (enabled) {
      play();
    }

    return pause;
  }, [enabled, pause, play]);
}
