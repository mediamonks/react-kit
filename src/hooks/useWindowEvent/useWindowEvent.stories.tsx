/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { type ReactElement, useState } from 'react';
import { useWindowEvent } from './useWindowEvent.js';

export default {
  title: 'hooks/useWindowEvent',
};

function DemoComponent(): ReactElement {
  const [size, setSize] = useState([0, 0]);

  useWindowEvent('resize', () => {
    setSize([window.innerWidth, window.innerHeight]);
  });

  return (
    <div>
      <p>Resize the viewport to listen to the resize event on the window</p>

      <pre>Viewport size: {size.join('x')}</pre>
    </div>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
