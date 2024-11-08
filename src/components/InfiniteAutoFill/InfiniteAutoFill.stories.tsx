import { type Meta, type StoryObj } from '@storybook/react';
import { InfiniteAutoFill } from './InfiniteAutoFill.js';

const meta = {
  title: 'Components / InfiniteAutoFill',
  component: InfiniteAutoFill,
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export default meta;

export const Horizontal: Story = {
  render() {
    return (
      <div
        style={{
          width: 520,
          display: 'flex',
          outline: '1px solid blue',
        }}
      >
        <InfiniteAutoFill axis="x">
          <div
            style={{
              padding: 15,
              flex: '0 1 auto',
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                outline: '1px solid red',
              }}
            />
          </div>

          <div
            style={{
              padding: 15,
              flex: '0 1 auto',
            }}
          >
            <div
              style={{
                width: 75,
                height: 50,
                outline: '1px solid yellow',
              }}
            />
          </div>
        </InfiniteAutoFill>
      </div>
    );
  },
  args: {
    children: <div />,
  },
};

export const Vertical: Story = {
  render() {
    return (
      <div
        style={{
          height: 520,
          width: 80,
          display: 'flex',
          flexDirection: 'column',
          outline: '1px solid blue',
        }}
      >
        <InfiniteAutoFill axis="y">
          <div
            style={{
              padding: 15,
              flex: '0 1 auto',
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                outline: '1px solid red',
              }}
            />
          </div>
        </InfiniteAutoFill>
      </div>
    );
  },
  args: {
    children: <div />,
  },
};
