/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { type ReactElement, useEffect, useRef } from 'react';
import { useHasFocus } from './useHasFocus.js';

export default {
  title: 'hooks/useHasFocus',
};

function DemoComponent(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const hasFocus = useHasFocus(ref, ':focus-within');

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(hasFocus);
  }, [hasFocus]);

  return (
    <div ref={ref}>
      <button type="button">Click me to change focus</button>
      <button type="button">Click me to change focus</button>
      <button type="button">Click me to change focus</button>
    </div>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
