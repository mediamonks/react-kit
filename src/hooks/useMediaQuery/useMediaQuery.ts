import { useEffect, useState } from 'react';
import { useEventListener } from '../useEventListener/useEventListener.js';

/**
 * The MediaQuery type is used for the `mediaQueryVariableName` parameter of
 * `useMediaQuery`.
 *
 * Augment the MediaQuery interface to add the names for the CSS variables that
 * describe media queries in your project.
 *
 * @example
 * declare module '@mediamonks/react-hooks' {
 *   interface MediaQuery {
 *     '--media-query-name': string;
 *   }
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MediaQuery {}

type MediaQueries = keyof MediaQuery;

export function getMediaQueryList(
  mediaQueryVariableName: MediaQueries,
): MediaQueryList | undefined {
  if (typeof matchMedia === 'undefined') {
    return undefined;
  }

  return matchMedia(getComputedStyle(document.body).getPropertyValue(mediaQueryVariableName));
}

/**
 * Hook that returns a boolean indicating whether the media query matches.
 *
 * @param mediaQueryVariableName - The name of the CSS variable that describes the media query.
 * @param defaultValue - The default value to return if the matchMedia API is not available.
 */
export function useMediaQuery(mediaQueryVariableName: MediaQueries, defaultValue = false): boolean {
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | undefined>(() =>
    getMediaQueryList(mediaQueryVariableName),
  );
  const [matches, setMatches] = useState<boolean | undefined>(defaultValue);

  useEffect(() => {
    const _mediaQueryList = getMediaQueryList(mediaQueryVariableName);

    setMediaQueryList(_mediaQueryList);
    setMatches(_mediaQueryList?.matches);
  }, [defaultValue, mediaQueryList?.matches, mediaQueryVariableName]);

  useEventListener(mediaQueryList, 'change', (event) => {
    if (event instanceof MediaQueryListEvent) {
      setMatches(event.matches);
    }
  });

  return matches ?? defaultValue;
}
