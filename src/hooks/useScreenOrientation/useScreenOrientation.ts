import { useMediaQuery } from '../useMediaQuery/useMediaQuery.js';

/**
 * This hook observes the orientation of the of the screen.
 *
 * @returns An object with 2 values: isLandscape and isPortrait, both booleans where the later is the opposite of the first.
 */

export function useScreenOrientation(): {
  isLandscape: boolean | undefined;
  isPortrait: boolean | undefined;
} {
  const isLandscape = useMediaQuery('(orientation: landscape)');

  return {
    isLandscape,
    isPortrait: !isLandscape,
  };
}
