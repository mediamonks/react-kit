import { useCallback, useRef } from 'react';
import { useRefValue } from '../useRefValue/useRefValue.js';
import { useUnmount } from '../useUnmount/useUnmount.js';

/**
 * Hook that returns a function that will be called on the next animation frame.
 * This is useful for performing non-blocking updates to the DOM or other state.
 */
export function useRafCallback(callback: FrameRequestCallback): () => number {
  const callbackRef = useRefValue(callback);
  const animationFrameRef = useRef(0);

  useUnmount(() => {
    cancelAnimationFrame(animationFrameRef.current);
  });

  return useCallback(() => {
    cancelAnimationFrame(animationFrameRef.current);

    animationFrameRef.current = requestAnimationFrame((time) => {
      callbackRef.current?.(time);
    });

    return animationFrameRef.current;
  }, [callbackRef]);
}
