/* eslint-disable react/jsx-no-literals, react/no-multi-comp */
import { animate } from 'motion';
import { useCallback, useRef, type ReactElement } from 'react';
import { useAnimation } from './useAnimation.js';

export default {
  title: 'Motion / Hooks / useAnimation',
  component: Sequence,
};

const boxStyle = {
  width: 300,
  height: 300,
  background: 'purple',
} as const;

export function Sequence(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const animation = useAnimation(() => {
    if (ref.current === null) {
      return;
    }

    return animate([
      [ref.current, { scaleX: [0, 0.25], scaleY: [0, 0.25] }, { ease: 'easeInOut' }],
      [ref.current, { scaleX: 1 }, { ease: 'easeInOut' }],
      [ref.current, { scaleX: 0.25, scaleY: 1 }, { ease: 'easeInOut' }],
      [ref.current, { scaleY: 0.25 }, { ease: 'easeInOut' }],
      [ref.current, { scaleX: 1, scaleY: 1 }, { at: '+0.5', type: 'spring', bounce: 0.5 }],
    ]);
  }, []);

  const onReplay = useCallback(() => {
    if (animation.current) {
      animation.current.time = 0;
      animation.current.play();
    }
  }, [animation]);

  return (
    <>
      <div ref={ref} style={boxStyle} />

      <br />
      <br />

      <button onClick={onReplay} type="button">
        Replay
      </button>
    </>
  );
}

export function Tween(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const animation = useAnimation(() => {
    if (ref.current === null) {
      return;
    }

    return animate(
      ref.current,
      { scale: [0, 1], rotate: [120, 0] },
      { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    );
  }, []);

  const onReplay = useCallback(() => {
    if (animation.current) {
      animation.current.time = 0;
      animation.current.play();
    }
  }, [animation]);

  return (
    <>
      <div ref={ref} style={boxStyle} />

      <br />
      <br />

      <button onClick={onReplay} type="button">
        Replay
      </button>
    </>
  );
}

export function OnAction(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const animation = useAnimation(() => {
    if (ref.current === null) {
      return;
    }

    const controls = animate(
      ref.current,
      { scale: [0, 1], rotate: [120, 0] },
      { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    );
    controls.pause();

    return controls;
  }, []);

  const onPlay = useCallback(() => {
    if (animation.current?.state === 'finished') {
      animation.current.time = 0;
    }

    animation.current?.play();
  }, [animation]);

  const onPause = useCallback(() => {
    animation.current?.pause();
  }, [animation]);

  const onReset = useCallback(() => {
    if (animation.current) {
      animation.current.pause();
      animation.current.time = 0;
    }
  }, [animation]);

  return (
    <>
      <div ref={ref} style={boxStyle} />

      <br />

      <button onClick={onPlay} type="button">
        Play
      </button>

      <button onClick={onPause} type="button">
        Pause
      </button>

      <button onClick={onReset} type="button">
        Reset
      </button>
    </>
  );
}
