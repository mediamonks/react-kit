/* eslint-disable react/jsx-no-literals, react/no-multi-comp */
import { animate, type Timeline } from 'motion';
import { useCallback, useRef, useState, type ReactElement, type RefObject } from 'react';
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

export function NestedInParentTimeline(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const animationReference = useRef(Symbol('child animation'));
  const [showChild, setShowChild] = useState(true);
  // The child's animation is a Timeline (animate() from motion 14.7 and up), so it can be added.
  const child = useExposedAnimation<Timeline>(animationReference);

  const timeline = useAnimation(() => {
    if (ref.current === null) {
      return;
    }

    const parentTimeline = animate([[ref.current, { x: [0, 200] }, { duration: 0.6 }]]);
    parentTimeline.pause();

    // The child starts 0.3s before the parent's own animation ends. Without a child (it unmounted)
    // the timeline is built again without it.
    if (child) {
      parentTimeline.add(child, '-0.3');
    }

    return parentTimeline;
  }, [child]);

  const onPlay = useCallback(() => {
    if (timeline.current) {
      timeline.current.time = 0;
      timeline.current.play();
    }
  }, [timeline]);

  const onToggleChild = useCallback(() => {
    setShowChild((isShown) => !isShown);
  }, []);

  return (
    <>
      <div
        ref={ref}
        style={{
          width: 100,
          height: 100,
          background: 'teal',
        }}
      />

      <br />

      {showChild && <Child animationReference={animationReference} />}

      <br />

      <button onClick={onPlay} type="button">
        Play the parent timeline
      </button>
      <button onClick={onToggleChild} type="button">
        {showChild ? 'Remove the child' : 'Add the child'}
      </button>
    </>
  );
}
