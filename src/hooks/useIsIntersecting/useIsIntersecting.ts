import { RefObject, useRef, useState } from 'react';
import { useIntersectionObserver } from '../useIntersectionObserver/useIntersectionObserver.js';

/**
 * @param targetOrTargets
 * @param options
 */
export function useIsIntersecting(
  targetOrTargets: RefObject<Element | ReadonlyArray<Element | null> | null>,
  options?: IntersectionObserverInit,
): RefObject<boolean> {
  const isIntersectingRef = useRef(false);

  useIntersectionObserver(
    targetOrTargets,
    (entries) => {
      isIntersectingRef.current = entries.every((entry) => entry.isIntersecting);
    },
    options,
  );

  return isIntersectingRef;
}
