/* eslint-disable react-hooks/rules-of-hooks, react/jsx-no-literals */
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { fireEvent, within } from '@storybook/testing-library';
import { useRef, useState } from 'react';
import { arrayRef } from '../../index.js';
import { useIntersectionObserver } from './useIntersectionObserver.js';

const meta = {
  title: 'hooks/useIntersectionObserver',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const listFormat = new Intl.ListFormat('en');
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'seagreen'];

export const WithRefs: Story = {
  render() {
    const [visibleColors, setVisibleColors] = useState(new Set<string>());
    const targetRefs = useRef<Array<HTMLDivElement | null>>([]);

    useIntersectionObserver(targetRefs, (entries) => {
      setVisibleColors((previousColors) => {
        for (const entry of entries) {
          const color = (entry.target as HTMLElement).style.backgroundColor;

          if (entry.isIntersecting) {
            previousColors.add(color);
          } else {
            previousColors.delete(color);
          }
        }

        return new Set(previousColors);
      });
    });

    return (
      <>
        <p>Visible colors: {listFormat.format(visibleColors.values())}</p>
        <div style={{ height: 400, overflowY: 'scroll' }} data-testid="scroll">
          {colors.map((color, index) => (
            <div
              key={color}
              ref={arrayRef(targetRefs, index)}
              data-testid={color}
              style={{
                height: '80%',
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      </>
    );
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    expect(await canvas.findByText('Visible colors: red and blue')).not.toBeNull();

    fireEvent.scroll(canvas.getByTestId('scroll'), {
      target: { scrollTop: 1240 },
    });

    expect(canvas.findByText('Visible colors: yellow, purple, and seagreen')).not.toBeNull();
  },
};

export const WithRef: Story = {
  render() {
    const [greenVisible, setGreenVisible] = useState(false);
    const targetRef = useRef<HTMLDivElement | null>(null);

    useIntersectionObserver(targetRef, (entries) => {
      setGreenVisible(() => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            return true;
          }
        }

        return false;
      });
    });

    return (
      <>
        <p>Green visible: {greenVisible.toString()}</p>
        <div style={{ height: 400, overflowY: 'scroll' }} data-testid="scroll">
          {colors.map((color, index) => (
            <div
              key={color}
              ref={index === 2 ? targetRef : undefined}
              data-testid={color}
              style={{
                height: '80%',
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      </>
    );
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    expect(canvas.queryByText('Green visible: true')).toBeNull();

    fireEvent.scroll(canvas.getByTestId('scroll'), {
      target: { scrollTop: 320 },
    });

    expect(canvas.findByText('Green visible: true')).not.toBeNull();
  },
};
