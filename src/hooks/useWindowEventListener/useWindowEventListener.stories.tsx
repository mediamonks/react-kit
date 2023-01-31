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
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Resize the viewport to listen to the resize event on the window.</p>
      </div>

      <pre>Viewport size: {size.join('x')}</pre>
    </div>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
