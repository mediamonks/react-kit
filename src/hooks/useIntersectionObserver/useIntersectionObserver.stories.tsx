/* eslint-disable react/jsx-no-bind, react/no-multi-comp, react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver.js';

export default {
  title: 'hooks/useIntersectionObserver',
};

function DemoComponent(): ReactElement {
  const [visibleColors, setVisibleColors] = useState<Array<string>>([]);

  const targetRef = useRef<HTMLDivElement>(null);
  const secondTargetRef = useRef<HTMLDivElement>(null);
  const thirdTargetRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver([targetRef, secondTargetRef, thirdTargetRef], ([entry]) => {
    const target = entry.target as HTMLElement;
    const targetColor = target.style.backgroundColor;

    if (entry.isIntersecting && !visibleColors.includes(targetColor)) {
      setVisibleColors([...visibleColors, targetColor]);
    }

    if (!entry.isIntersecting && visibleColors.includes(targetColor)) {
      const referencedColors = [...visibleColors];
      referencedColors.splice(referencedColors.indexOf(targetColor), 1);

      setVisibleColors(referencedColors);
    }
  });

  return (
    <>
      <p>Currently these colors are visible: {visibleColors.join(', ')}</p>
      <div style={{ height: 100, overflow: 'scroll' }}>
        <div ref={targetRef} style={{ height: 100, backgroundColor: 'red' }}></div>
        <div ref={secondTargetRef} style={{ height: 100, backgroundColor: 'blue' }}></div>
        <div ref={thirdTargetRef} style={{ height: 100, backgroundColor: 'green' }}></div>
      </div>
    </>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
