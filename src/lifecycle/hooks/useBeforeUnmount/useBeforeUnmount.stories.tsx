/* eslint-disable react-hooks/rules-of-hooks, react/jsx-no-literals */
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { useState, type ReactElement, useRef } from 'react';
import { TransitionPresence } from '../../components/TransitionPresence/TransitionPresence.js';
import { useBeforeUnmount } from './useBeforeUnmount.js';

const meta = {
  title: 'Lifecycle / Hooks / useBeforeUnmount',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type ChildProps = {
  background: string;
  onClick(): void;
};

function Child({ background, onClick }: ChildProps): ReactElement {
  const ref = useRef<HTMLButtonElement>(null);

  useBeforeUnmount(async () => {
    if (!ref.current) {
      return;
    }

    const animation = ref.current.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 500,
      fill: 'forwards',
    });

    await animation.finished;
  });

  return (
    <button
      aria-label="Click to change color"
      type="button"
      style={{
        background,
        border: 'none',
        width: 200,
        height: 200,
      }}
      ref={ref}
      onClick={onClick}
    />
  );
}

export const UseBeforeUnmount: Story = {
  render() {
    const [isRedVisible, setIsRedVisible] = useState(true);

    return (
      <>
        <TransitionPresence>
          {isRedVisible ? (
            <Child
              key="red"
              background="red"
              // eslint-disable-next-line react/jsx-no-bind
              onClick={(): void => {
                setIsRedVisible(false);
              }}
            />
          ) : (
            <Child
              key="blue"
              background="blue"
              // eslint-disable-next-line react/jsx-no-bind
              onClick={(): void => {
                setIsRedVisible(true);
              }}
            />
          )}
        </TransitionPresence>
        <div style={{ marginTop: 24 }}>Click the square (isRedVisible: {String(isRedVisible)})</div>
      </>
    );
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    const redButton = canvas.getByRole('button');
    expect(redButton).toHaveStyle({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'background-color': 'rgb(255, 0, 0)',
    });

    await userEvent.click(redButton, { delay: 1000 });

    const blueButton = canvas.getByRole('button');
    expect(blueButton).toHaveStyle({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'background-color': 'rgb(0, 0, 255)',
    });
  },
};
