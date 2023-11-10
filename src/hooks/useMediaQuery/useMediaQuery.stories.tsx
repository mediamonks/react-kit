/* eslint-disable react/jsx-no-literals */
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import type { ReactElement } from 'react';
import { useMediaQuery } from './useMediaQuery.js';

const meta = {
  title: 'Hooks / useMediaQuery',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const css = `
  :root {
    --min-width-420: (min-width: 420px);
  }
`;

function DemoComponent(): ReactElement {
  const isMinWidth420px = useMediaQuery('--min-width-420');

  return (
    <>
      <style>{css}</style>

      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Resize the viewport to see the useMediaQuery hook in action.</p>
      </div>

      <div>
        {isMinWidth420px ? 'Viewport is wider than 420px' : 'Viewport is narrower than 420px'}
      </div>
    </>
  );
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '500px',
          },
        },
      },
      defaultViewport: 'mobile',
    },
  },
  render() {
    return <DemoComponent />;
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    canvas.getByText('Viewport is narrower than 420px');
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      viewports: {
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '500px',
          },
        },
      },
      defaultViewport: 'desktop',
    },
  },
  render() {
    return <DemoComponent />;
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    // Using findByText because initial state is different to support SSR
    expect(await canvas.findByText('Viewport is wider than 420px')).toBeVisible();
  },
};
