/* eslint-disable react/no-multi-comp */
import { render, renderHook, waitFor } from '@testing-library/react';
import { animate, type Timeline } from 'motion';
import { useRef, type ReactElement, type RefObject } from 'react';
import { describe, expect, it } from 'vitest';
import { useAnimation } from '../useAnimation/useAnimation.js';
import { useExposeAnimation } from '../useExposeAnimation/useExposeAnimation.js';
import { useExposedAnimation } from './useExposedAnimation.js';

describe('useExposedAnimation', () => {
  it('should return undefined when nothing is exposed', () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));

      return useExposedAnimation(ref);
    });

    expect(hook.result.current).toBeUndefined();
  });

  it('should return the animation exposed for the reference', async () => {
    const hook = renderHook(() => {
      const ref = useRef(Symbol('reference'));
      const animation = useAnimation(() => animate({ value: 0 }, { value: 1 }), []);

      useExposeAnimation(animation, ref);

      return { animation, exposed: useExposedAnimation(ref) };
    });

    await waitFor(() => {
      expect(hook.result.current.exposed).toBe(hook.result.current.animation.current);
    });
  });

  describe('nested in a parent timeline', () => {
    type Targets = { parent: { y: number }; child: { x: number } };

    function Child({
      reference,
      targets,
    }: {
      reference: RefObject<symbol>;
      targets: Targets;
    }): null {
      const animation = useAnimation(
        () => animate(targets.child, { x: [0, 100] }, { duration: 1, ease: 'linear' }),
        [targets],
      );

      useExposeAnimation(animation, reference);

      return null;
    }

    type ParentProps = {
      showChild: boolean;
      at: number;
      targets: Targets;
      timelines: Array<Timeline>;
    };

    function Parent({ showChild, at, targets, timelines }: ParentProps): ReactElement | null {
      const reference = useRef(Symbol('child animation'));
      const child = useExposedAnimation<Timeline>(reference);

      useAnimation(() => {
        const timeline = animate([
          [targets.parent, { y: [0, 100] }, { duration: 1, ease: 'linear' }],
        ]);
        timeline.pause();

        if (child) {
          timeline.add(child, at);
        }

        timelines.push(timeline);

        return timeline;
      }, [child, at, targets, timelines]);

      return showChild ? <Child reference={reference} targets={targets} /> : null;
    }

    function setup(): {
      targets: Targets;
      timelines: Array<Timeline>;
      rerender(props: Pick<ParentProps, 'showChild' | 'at'>): void;
      latest(): Timeline | undefined;
    } {
      const targets = { parent: { y: 0 }, child: { x: 0 } };
      const timelines: Array<Timeline> = [];
      const { rerender } = render(
        <Parent showChild at={0.5} targets={targets} timelines={timelines} />,
      );

      return {
        targets,
        timelines,
        rerender(props): void {
          rerender(<Parent {...props} targets={targets} timelines={timelines} />);
        },
        latest: () => timelines.at(-1),
      };
    }

    it('should play the child at its position in the parent', async () => {
      const { targets, latest } = setup();

      await waitFor(() => {
        expect(latest()?.duration).toBe(1.5);
      });

      const timeline = latest();

      if (timeline) {
        timeline.time = 1;
      }

      await waitFor(() => {
        expect(targets.child.x).toBeCloseTo(50);
      });
      expect(targets.parent.y).toBeCloseTo(100);
    });

    it('should rebuild the parent without the child when the child unmounts', async () => {
      const { rerender, latest } = setup();

      await waitFor(() => {
        expect(latest()?.duration).toBe(1.5);
      });

      rerender({ showChild: false, at: 0.5 });

      await waitFor(() => {
        expect(latest()?.duration).toBe(1);
      });
    });

    it('should move the child to a new parent when the parent is rebuilt', async () => {
      const { targets, rerender, latest } = setup();

      await waitFor(() => {
        expect(latest()?.duration).toBe(1.5);
      });

      rerender({ showChild: true, at: 0.25 });

      await waitFor(() => {
        expect(latest()?.duration).toBe(1.25);
      });

      const timeline = latest();

      if (timeline) {
        timeline.time = 0.75;
      }

      await waitFor(() => {
        expect(targets.child.x).toBeCloseTo(50);
      });
    });
  });
});
