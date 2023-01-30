/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useEventListener } from './useEventListener.js';

export default {
  title: 'hooks/useEventListener',
};

function DemoComponent(): ReactElement {
  useEventListener(typeof document === 'undefined' ? undefined : document, 'focusin', () => {
    // eslint-disable-next-line no-console
    console.log(document.activeElement);
  });

  return (
    <div>
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
