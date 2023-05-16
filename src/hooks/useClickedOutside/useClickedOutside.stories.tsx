/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-no-literals */
import { type Meta, type StoryObj } from '@storybook/react';
import { useRef, useState, type ReactElement } from 'react';
import { useClickedOutside } from './useClickedOutside.js';

export default {
  title: 'hooks/useClickedOutside',
} satisfies Meta;

export const RefObject = {
  render(): ReactElement {
    const ref = useRef(null);

    useClickedOutside(ref, () => {
      // eslint-disable-next-line no-console
      console.log('Clicked outside!');
    });

    return <div ref={ref}>Click outside of this element to trigger the callback.</div>;
  },
} satisfies StoryObj;

export const State = {
  render(): ReactElement {
    const [element, setElement] = useState<HTMLDivElement | null>(null);

    useClickedOutside(element, () => {
      // eslint-disable-next-line no-console
      console.log('Clicked outside!');
    });

    return <div ref={setElement}>Click outside of this element to trigger the callback.</div>;
  },
} satisfies StoryObj;

export const CustomOptions = {
  render(): ReactElement {
    const ref = useRef<HTMLDivElement>(null);

    useClickedOutside(
      ref,
      () => {
        // eslint-disable-next-line no-console
        console.log('Clicked outside!');
      },
      { capture: true },
    );

    return <div ref={ref}>Click outside of this element to trigger the callback.</div>;
  },
} satisfies StoryObj;

export const MultipleElements = {
  render(): ReactElement {
    const ref1 = useRef(null);
    const ref2 = useRef(null);

    useClickedOutside(ref1, () => {
      // eslint-disable-next-line no-console
      console.log('Clicked outside of element 1!');
    });

    useClickedOutside(ref2, () => {
      // eslint-disable-next-line no-console
      console.log('Clicked outside of element 2!');
    });

    return (
      <>
        <div ref={ref1}>Click outside of this element to trigger the callback for element 1.</div>
        <div ref={ref2}>Click outside of this element to trigger the callback for element 2.</div>
      </>
    );
  },
} satisfies StoryObj;
