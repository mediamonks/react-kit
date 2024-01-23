/* eslint-disable react/jsx-no-literals */
import { type Meta, type StoryObj } from '@storybook/react';
import { AutoFill } from './AutoFill.js';

const meta = {
  title: 'Components / AutoFill',
  component: AutoFill,
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
        <AutoFill axis="x">
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
        </AutoFill>
      </div>
    );
  },
  args: {
    children: <div />,
  },
};

export const HorizontalWithAdditionalCloneCount: Story = {
  render() {
    return (
      <div
        style={{
          width: 520,
          display: 'flex',
          outline: '1px solid blue',
        }}
      >
        <AutoFill axis="x" additionalCloneCount={1}>
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
        </AutoFill>
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
        <AutoFill axis="y">
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
        </AutoFill>
      </div>
    );
  },
  args: {
    children: <div />,
  },
};
