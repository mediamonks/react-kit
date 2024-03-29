import gsap from 'gsap';
import Flip from 'gsap/Flip';
import { useEffect, useRef, type MutableRefObject } from 'react';
import { unref, type Unreffable } from '../../../utils/unref/unref.js';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

export function useFlip(
  ref: Unreffable<HTMLElement | null>,
  flipStateVariables: Flip.FromToVars = {},
): MutableRefObject<Flip.FlipState | undefined> {
  const flipStateRef = useRef<Flip.FlipState>();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (globalThis.window !== undefined) {
    flipStateRef.current = Flip.getState(unref(ref));
  }

  useEffect(() => {
    if (flipStateRef.current) {
      Flip.from(flipStateRef.current, flipStateVariables);
    }
  });

  return flipStateRef;
}
