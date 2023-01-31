/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { type ReactElement, useState } from 'react';
import { useWindowEventListener } from './useWindowEventListener.js';

export default {
  title: 'hooks/useWindowEventListener',
};

function DemoComponent(): ReactElement {
  const [size, setSize] = useState([0, 0]);

  useWindowEventListener('resize', () => {
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
