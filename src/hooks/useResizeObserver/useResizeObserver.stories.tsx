import type { StoryObj } from '@storybook/react';
import { type ReactElement, useRef, useState } from 'react';
import { useResizeObserver } from './useResizeObserver.js';

export default {
  title: 'hooks/useResizeObserver',
};

function DemoComponent(): ReactElement {
  const elementRef = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useResizeObserver(elementRef, () => {
    // eslint-disable-next-line no-console
    console.log('Element from RefObject resized');
  });

  useResizeObserver(element, () => {
    // eslint-disable-next-line no-console
    console.log('Element from state resized');
  });

  return (
    <>
      <div ref={elementRef}></div>
      <div ref={setElement}></div>
    </>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
