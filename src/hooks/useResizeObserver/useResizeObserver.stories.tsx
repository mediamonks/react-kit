import type { StoryObj } from '@storybook/react';
import { type ReactElement, useRef } from 'react';
import { useResizeObserver } from './useResizeObserver.js';

export default {
  title: 'hooks/useResizeObserver',
};

function DemoComponent(): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useResizeObserver(ref, () => {
    // eslint-disable-next-line no-console
    console.log('Element resized');
  });

  return <div ref={ref}></div>;
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
