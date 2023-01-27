/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useDocumentEvent } from './useDocumentEvent.js';

export default {
  title: 'hooks/useDocumentEvent',
};

function DemoComponent(): ReactElement {
  useDocumentEvent('focusin', () => {
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
