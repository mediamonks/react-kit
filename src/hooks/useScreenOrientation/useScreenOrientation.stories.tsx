/* eslint-disable react/jsx-no-literals */
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useScreenOrientation } from './useScreenOrientation.js';

const meta = {
  title: 'Hooks / useScreenOrientation',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function DemoComponent(): ReactElement {
  const { isLandscape } = useScreenOrientation();

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions</h4>
        <p className="mb-0">Resize the viewport to see the useScreenOrientation hook in action.</p>
      </div>

      <div>
        <div>Orientation: {isLandscape ? 'Landscape' : 'Portrait'}</div>
      </div>
    </div>
  );
}

export const Demo: Story = {
  render() {
    return <DemoComponent />;
  },
};
