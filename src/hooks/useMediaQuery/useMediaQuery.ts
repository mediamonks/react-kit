import { useEffect, useState } from 'react';
import { useEventListener } from '../useEventListener/useEventListener.js';

/**
 * The MediaQueryVariables type is used for the `mediaQueryOrVariableName` parameter of
 * `useMediaQuery`.
 *
 * Augment the MediaQueryVariables interface to add the names for the CSS variables that
 * describe media queries in your project.
 *
 * @example
 * import '@mediamonks/react-hooks';
 *
 * declare module '@mediamonks/react-hooks' {
 *   interface MediaQueryVariables {
 *     '--media-query-name': never;
 *   }
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MediaQueryVariables {}

/**
 * Enables auto-completion for the variable names that are defined in `MediaQueryVariables` and also allows custom string values.
 */
type MediaQueryValues =
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | keyof MediaQueryVariables
  | (string & {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __custom_query__do_not_use_this_field__?: boolean;
    });

export function getMediaQueryList(
  mediaQueryOrVariableName: MediaQueryValues,
): MediaQueryList | undefined {
  if (typeof matchMedia === 'undefined') {
    return undefined;
  }

  const mediaQuery = mediaQueryOrVariableName.startsWith('--')
    ? getComputedStyle(document.body).getPropertyValue(mediaQueryOrVariableName)
    : mediaQueryOrVariableName;

  return matchMedia(mediaQuery);
}

/**
 * Hook that returns a boolean indicating whether the media query matches.
 *
 * @param mediaQueryOrVariableName - The name of the CSS variable that describes the media query.
 * @param defaultValue - The default value to return if the matchMedia API is not available.
 */
export function useMediaQuery(
  mediaQueryOrVariableName: MediaQueryValues,
  defaultValue = false,
): boolean {
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | undefined>(() =>
    getMediaQueryList(mediaQueryOrVariableName),
  );
  const [matches, setMatches] = useState<boolean | undefined>(defaultValue);

  useEffect(() => {
    const newMediaQueryList = getMediaQueryList(mediaQueryOrVariableName);

    setMediaQueryList(newMediaQueryList);
    setMatches(newMediaQueryList?.matches);
  }, [defaultValue, mediaQueryList?.matches, mediaQueryOrVariableName]);

  useEventListener(mediaQueryList, 'change', (event) => {
    if (event instanceof MediaQueryListEvent) {
      setMatches(event.matches);
    }
  });

  return matches ?? defaultValue;
}
