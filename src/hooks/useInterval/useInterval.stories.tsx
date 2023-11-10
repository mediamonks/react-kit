/* eslint-disable react-hooks/rules-of-hooks, react/jsx-no-literals */
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState, type ReactElement } from 'react';
import { useInterval } from './useInterval.js';

const meta = {
  title: 'Hooks / useInterval',
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export default meta;

export const Demo = {
  render(): ReactElement {
    const [count, setCount] = useState(0);

    useInterval(() => {
      // This counter works because a new closure is created every time the state is updated
      setCount(count + 1);
    }, 1000);

    return (
      <div>
        <p>Count: {count}</p>
      </div>
    );
  },
} satisfies Story;

export const ReliableTimer = {
  render(): ReactElement {
    const startTimeRef = useRef(Date.now());
    const [count, setCount] = useState(0);

    useInterval(() => {
      setCount(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    return (
      <div>
        <p>Count: {count}</p>
      </div>
    );
  },
} satisfies Story;
