import type { AnimationPlaybackControls } from 'motion';
import { animations } from '../../animations.js';

/**
 * Tries to get a Motion animation from the global animations map for given reference
 */
export function getAnimation(reference: unknown): AnimationPlaybackControls | undefined {
  return animations.get(reference);
}
