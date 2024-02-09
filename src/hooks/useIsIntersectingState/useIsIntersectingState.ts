import { RefObject, useState } from 'react';
import { useIntersectionObserver } from '../useIntersectionObserver/useIntersectionObserver.js';

/**
 * @param targetOrTargets
 * @param options
 */
export function useIsIntersectingState(
  targetOrTargets: RefObject<Element | ReadonlyArray<Element | null> | null>,
  options?: IntersectionObserverInit,
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useIntersectionObserver(
    targetOrTargets,
    (entries) => {
      setIsIntersecting(() => entries.every((entry) => entry.isIntersecting));
    },
    options,
  );

  return isIntersecting;
}
