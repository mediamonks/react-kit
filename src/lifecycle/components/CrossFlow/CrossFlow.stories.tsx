/* eslint-disable react/no-multi-comp, react/jsx-no-literals, react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { Fragment, useRef, useState, type ReactElement } from 'react';
import { useBeforeUnmount } from '../../hooks/useBeforeUnmount/useBeforeUnmount.js';
import { CrossFlow } from './CrossFlow.js';

const meta = {
  title: 'Lifecycle / components/CrossFlow',
  argTypes: {
    children: {
      description: 'ReactElement | null',
      type: 'string',
    },
    onChildrenMounted: {
      description: '() => void | undefined',
      type: 'string',
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type ChildProps = {
  background: string;
  duration?: number;
  onClick?(): void;
};

function Child({ background, onClick, duration = 1000 }: ChildProps): ReactElement {
  const ref = useRef<HTMLButtonElement>(null);

  // show visible animation during "before unmount" lifecycle
  useBeforeUnmount(async (abortSignal) => {
    if (!ref.current) {
      return;
    }

    const animation = ref.current.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration,
      fill: 'forwards',
    });

    abortSignal.addEventListener('abort', () => {
      animation.cancel();
    });

    await animation.finished;
  });

  return (
    <button
      ref={ref}
      aria-label="Click to change color"
      type="button"
      style={{
        background,
        border: 'none',
        width: 200,
        height: 200,
      }}
      onClick={onClick}
    />
  );
}

export const CrossFlowExample: Story = {
  render() {
    const [hue, setHue] = useState(0);

    return (
      <>
        <CrossFlow>
          <Child
            // Changing a key will create a new component instance and thus animates out the previous child
            key={hue}
            background={`repeating-linear-gradient(
            -45deg,
            hsl(${hue}, 100%, 50%),
            hsl(${hue}, 100%, 50%) 10px,
            hsl(${(hue + 180) % 360}, 100%, 50%) 10px,
            hsl(${(hue + 180) % 360}, 100%, 50%) 20px
          )`}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={(): void => {
              setHue(hue + ((90 + Math.random() * 270) % 360));
            }}
          />
        </CrossFlow>

        <div style={{ marginTop: 24 }}>Click the square to create a new element</div>
      </>
    );
  },
};

export const CrossFlowFragmentExample: Story = {
  render() {
    const [hue, setHue] = useState(0);

    return (
      <>
        <CrossFlow>
          <Fragment key={hue}>
            <Child
              background={`repeating-linear-gradient(
            -45deg,
            hsl(${hue}, 100%, 50%),
            hsl(${hue}, 100%, 50%) 10px,
            hsl(${(hue + 180) % 360}, 100%, 50%) 10px,
            hsl(${(hue + 180) % 360}, 100%, 50%) 20px
          )`}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={(): void => {
                setHue(hue + ((90 + Math.random() * 270) % 360));
              }}
            />
            <Child
              background={`repeating-linear-gradient(
            -45deg,
            hsl(${hue + (90 % 360)}, 100%, 50%),
            hsl(${hue + (90 % 360)}, 100%, 50%) 10px,
            hsl(${(hue + 270) % 360}, 100%, 50%) 10px,
            hsl(${(hue + 270) % 360}, 100%, 50%) 20px
          )`}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={(): void => {
                setHue(hue + ((90 + Math.random() * 270) % 360));
              }}
            />
          </Fragment>
        </CrossFlow>

        <div style={{ marginTop: 24 }}>Click the square to create a new element</div>
      </>
    );
  },
};
