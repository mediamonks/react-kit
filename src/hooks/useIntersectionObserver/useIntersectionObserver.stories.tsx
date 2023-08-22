/* eslint-disable react/jsx-no-bind, react/no-multi-comp, react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver.js';

export default {
  title: 'hooks/useIntersectionObserver',
};

function DemoComponent(): ReactElement {
  const [isRedVisible, setIsRedVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(targetRef, ([entry]) => {
    setIsRedVisible(entry.isIntersecting);
  });

  return (
    <>
      <p>
        Scroll down in green element, red is currently{' '}
        <strong>{isRedVisible ? '' : 'NOT'} VISIBLE</strong>
      </p>
      <div ref={containerRef} style={{ height: 100, overflow: 'scroll', backgroundColor: 'green' }}>
        <div ref={targetRef} style={{ height: 100, marginTop: 200, backgroundColor: 'red' }}></div>
      </div>
    </>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
