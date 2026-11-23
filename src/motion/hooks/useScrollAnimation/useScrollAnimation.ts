import { scroll, type AnimationPlaybackControls } from 'motion';
import { type RefObject, useCallback, useEffect, useRef } from 'react';

/**
 * The options of Motion's `scroll()`: `target`, `container`, `axis` and `offset`.
 */
export type ScrollAnimationOptions = NonNullable<Parameters<typeof scroll>[1]>;

/**
 * Create a Motion animation via a callback and link its progress to scroll with Motion's
 * `scroll()`. The options are read when the animation is created, so they can hold elements from
 * refs. The animation is stopped, and its link to scroll removed, when the component is unmounted
 * or when a new callback function is provided.
 *
 * Motion measures the target and container itself and keeps the progress up to date when their
 * size changes, so there is no refresh as with ScrollTrigger.
 */
export function useScrollAnimation<T extends AnimationPlaybackControls>(
  callback: () => T | undefined,
  dependencies: ReadonlyArray<unknown>,
  getOptions?: () => ScrollAnimationOptions | undefined,
): RefObject<T | undefined> {
  const animation = useRef<T>(
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps, no-underscore-dangle
  const _callback = useCallback(callback, dependencies);
  // The options belong to the callback: read them when it changes, not on every render
  const options = useRef(getOptions);
  options.current = getOptions;

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const _animation = _callback();
    animation.current = _animation;

    if (_animation === undefined) {
      return;
    }

    const removeScroll = scroll(_animation, options.current?.());

    return () => {
      removeScroll();
      _animation.stop();
    };
  }, [_callback]);

  return animation;
}
