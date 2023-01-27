/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useWindowEvent } from './useWindowEvent.js';

export default {
  title: 'hooks/useWindowEvent',
};

function DemoComponent(): ReactElement {
  useWindowEvent('resize', () => {
    // eslint-disable-next-line no-console
    console.log('window resized');
  });

  return <div></div>;
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
