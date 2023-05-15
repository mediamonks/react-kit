/* eslint-disable react-hooks/rules-of-hooks */
import type { StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { useResizeObserver } from './useResizeObserver.js';

export default {
  title: 'hooks/useResizeObserver',
};

export const UsingRefObject: StoryObj = {
  render() {
    const ref = useRef<HTMLDivElement>(null);

    useResizeObserver(ref, () => {
      // eslint-disable-next-line no-console
      console.log('Element resized');
    });

    return <div ref={ref}></div>;
  },
};

export const UsingState: StoryObj = {
  render() {
    const [element, setElement] = useState<HTMLDivElement | null>(null);

    useResizeObserver(element, () => {
      // eslint-disable-next-line no-console
      console.log('Element resized');
    });

    return <div ref={setElement}></div>;
  },
};
