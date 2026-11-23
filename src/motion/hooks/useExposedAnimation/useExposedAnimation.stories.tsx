/* eslint-disable react/jsx-no-literals, react/no-multi-comp */
import { animate } from 'motion';
import { useCallback, useRef, type ReactElement, type RefObject } from 'react';
import { useAnimation } from '../useAnimation/useAnimation.js';
import { useExposeAnimation } from '../useExposeAnimation/useExposeAnimation.js';
import { useExposedAnimation } from './useExposedAnimation.js';

export default {
  title: 'Motion / Hooks / useExposedAnimation',
  component: ChildComponentAnimation,
};

type ChildProps = {
  animationReference: RefObject<symbol>;
};

function Child({ animationReference }: ChildProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const animation = useAnimation(() => {
    if (ref.current === null) {
      return;
    }

    const controls = animate(ref.current, { x: [0, 200] }, { duration: 0.6 });
    controls.pause();

    return controls;
  }, []);

  useExposeAnimation(animation, animationReference);

  return (
    <div
      ref={ref}
      style={{
        width: 100,
        height: 100,
        background: 'purple',
      }}
    />
  );
}

export function ChildComponentAnimation(): ReactElement {
  const animationReference = useRef(Symbol('child animation'));
  const animation = useExposedAnimation(animationReference);

  const onPlay = useCallback(() => {
    if (animation) {
      animation.time = 0;
      animation.play();
    }
  }, [animation]);

  return (
    <>
      <Child animationReference={animationReference} />

      <br />

      <button onClick={onPlay} type="button" disabled={animation === undefined}>
        Play the animation of the child
      </button>
    </>
  );
}
