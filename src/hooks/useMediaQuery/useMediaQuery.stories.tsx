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

type DemoComponentProps = { defaultValue?: boolean };
function DemoComponent({ defaultValue }: DemoComponentProps): ReactElement {
  const value = useMediaQuery('--min-width-420', defaultValue);

  return (
    <>
      <style>{css}</style>

      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Resize the viewport to see the useMediaQuery hook in action.</p>
      </div>

      <code
        style={{
          whiteSpace: 'pre',
        }}
      >{`:root {
  --min-width-420: (min-width: 420px);
}\n\n`}</code>

      <div>
        Default value: {String(defaultValue)}
        <br />
        Matches: <span data-testid="value">{String(value)}</span>
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
    expect(canvas.getByTestId('value').textContent).toBe('false');
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

    // Using getByText because initial state is different to support SSR
    expect(canvas.getByTestId('value').textContent).toBe('true');
  },
};
