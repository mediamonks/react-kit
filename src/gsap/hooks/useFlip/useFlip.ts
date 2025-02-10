import gsap from 'gsap';
import Flip from 'gsap/Flip';
import { type RefObject, useEffect, useRef } from 'react';
import { unref, type Unreffable } from '../../../utils/unref/unref.js';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

export function useFlip(
  ref: Unreffable<HTMLElement | null>,
  flipStateVariables: Flip.FromToVars = {},
): RefObject<Flip.FlipState | undefined> {
  const flipStateRef = useRef<Flip.FlipState>(
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined,
  );

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
