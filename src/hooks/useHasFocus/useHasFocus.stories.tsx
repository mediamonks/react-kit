/* eslint-disable react/jsx-no-literals */
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import { useHasFocus } from './useHasFocus.js';

const meta = {
  title: 'Hooks / useHasFocus',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function DemoComponent(): ReactElement {
  const ref = useRef<HTMLButtonElement>(null);

  const hasFocus = useHasFocus(ref, ':focus-visible');
  const [text, setText] = useState('No focus');

  useEffect(() => {
    setText(
      hasFocus ? 'Button 1 matches :focus-visible' : 'Button 1 does not match :focus-visible',
    );
  }, [hasFocus]);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Change focus to see the useHasFocus hook in action.</p>
      </div>

      <button type="button" ref={ref}>
        Button 1
      </button>

      <button type="button">Button 2</button>

      <pre>{text}</pre>
    </div>
  );
}

export const Demo: Story = {
  render() {
    return <DemoComponent />;
  },
};
