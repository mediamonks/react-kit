/* eslint-disable react/jsx-no-literals */
import { animate } from 'motion';
import { useRef, type ReactElement } from 'react';
import { useScrollAnimation } from './useScrollAnimation.js';

export default {
  title: 'Motion / Hooks / useScrollAnimation',
  component: ScrollAnimation,
};

export function ScrollAnimation(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useScrollAnimation(
    () => {
      if (ref.current === null) {
        return;
      }

      return animate(ref.current, { scale: [1, 0.5], rotate: [0, 90] }, { ease: 'linear' });
    },
    [],
    () => ({ target: ref.current ?? undefined, offset: ['start end', 'end start'] }),
  );

  return (
    <>
      <p>Scroll down</p>
      <div style={{ height: '100vh' }} />
      <div
        ref={ref}
        style={{
          width: 300,
          height: 300,
          background: 'purple',
        }}
      />
      <div style={{ height: '100vh' }} />
    </>
  );
}
