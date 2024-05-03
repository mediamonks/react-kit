import { type DependencyList, type EffectCallback, useEffect } from 'react';
import { useIsFirstRender } from '../useIsFirstRender/useIsFirstRender.js';

/**
 * This hook ignores the first render, so it's not invoked on mount.
 *
 * @param effect Function to run on updates
 * @param deps Dependencies list, as for `useEffect` hook
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(useIsFirstRender() ? (): undefined => undefined : effect, deps);
}
