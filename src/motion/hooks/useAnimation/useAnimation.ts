import type { AnimationPlaybackControls } from 'motion';
import { type RefObject, useCallback, useEffect, useRef } from 'react';

/**
 * Create a Motion animation via a callback, the animation is stopped when the component is
 * unmounted or when a new callback function is provided.
 */
export function useAnimation<T extends AnimationPlaybackControls | undefined>(
  callback: () => T,
  dependencies: ReadonlyArray<unknown>,
): RefObject<T | undefined> {
  const animation = useRef<T>(
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps, no-underscore-dangle
  const _callback = useCallback(callback, dependencies);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const _animation = _callback();
    animation.current = _animation;

    return () => {
      _animation?.stop();
    };
  }, [_callback]);

  return animation;
}
