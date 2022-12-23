import { useCallback, useState } from 'react';

/**
 * Easily toggle value between two states
 * @param initialValue Whether the toggle should be initially true or false
 *
 * @example
 * ```
 * const [isActive, toggle] = useToggle(false);
 * watchEffect(() => {
 *   console.log('active', isActive);
 * }
 * toggle();
 * toggle(false);
 * toggle(true);
 * ```
 */
export function useToggle(initialValue: boolean): readonly [boolean, (force?: boolean) => void] {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(
    (force?: boolean) => {
      setState((oldValue) => (force === undefined ? !oldValue : force));
    },
    [setState],
  );

  return [state, toggle] as const;
}
