/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import { useHasFocus } from './useHasFocus.js';

export default {
  title: 'hooks/useHasFocus',
};

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
      <button type="button" ref={ref}>
        Button 1
      </button>

      <button type="button">Button 2</button>

      <pre>{text}</pre>
    </div>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
