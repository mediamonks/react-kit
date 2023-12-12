import { expect } from '@storybook/jest';
import { type Meta, type StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { createTimeout } from '../../utils/createTimeout/createTimeout.js';
import { AutoAdjustFontSize } from './AutoAdjustFontSize.js';

const meta = {
  title: 'Components / AutoAdjustFontSize',
  component: AutoAdjustFontSize,
  argTypes: {
    minFontSize: {
      control: {
        type: 'number',
      },
    },
    maxFontSize: {
      control: {
        type: 'number',
      },
    },
    axis: {
      options: ['x', 'y'],
      control: { type: 'select' },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    children: "Hello World, how's life?",
    axis: 'x',
  },
  render(props) {
    return (
      <div
        style={{
          outline: '1px solid red',
          inlineSize: '50vw',
        }}
      >
        <AutoAdjustFontSize {...props} />
      </div>
    );
  },
};

export const HorizontalStatic: Story = {
  args: {
    children: "Hello World, how's life?",
    axis: 'x',
  },
  render(props) {
    return (
      <div
        style={{
          outline: '1px solid red',
          inlineSize: 250,
        }}
      >
        <AutoAdjustFontSize {...props} />
      </div>
    );
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const element = canvas.getByText("Hello World, how's life?");

    await createTimeout(100);

    expect(element).toHaveStyle({
      fontSize: '24px',
      whiteSpace: 'nowrap',
    });
  },
};

export const Vertical: Story = {
  args: {
    children: "Hello World, how's life?",
    axis: 'y',
  },
  render(props) {
    return (
      <div
        style={{
          outline: '1px solid red',
          inlineSize: 'min-content',
          blockSize: '50vh',
        }}
      >
        <AutoAdjustFontSize
          {...props}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        />
      </div>
    );
  },
};

export const VerticalStatic: Story = {
  args: {
    children: "Hello World, how's life?",
    axis: 'y',
  },
  render(props) {
    return (
      <div
        style={{
          outline: '1px solid red',
          inlineSize: 'min-content',
          blockSize: 250,
        }}
      >
        <AutoAdjustFontSize
          {...props}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        />
      </div>
    );
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    const element = canvas.getByText("Hello World, how's life?");

    await createTimeout(100);

    expect(element).toHaveStyle({
      fontSize: '24px',
      whiteSpace: 'nowrap',
    });
  },
};
