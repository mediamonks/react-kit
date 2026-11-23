import type { AnimationPlaybackControls } from 'motion';
import { animations } from '../../animations.js';

/**
 * Tries to get a Motion animation from the global animations map for given reference. Pass the
 * type the animation has, such as `Timeline` to add it to a parent timeline.
 */
export function getAnimation<T extends AnimationPlaybackControls = AnimationPlaybackControls>(
  reference: unknown,
): T | undefined {
  return animations.get(reference) as T | undefined;
}
