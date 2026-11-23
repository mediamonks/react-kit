import type { AnimationPlaybackControls } from 'motion';
import { AnimationsMap } from '../_utils/AnimationsMap/AnimationsMap.js';

/**
 * Global map of Motion animations that can be accessed by reference
 */
export const animations = new AnimationsMap<AnimationPlaybackControls>();
