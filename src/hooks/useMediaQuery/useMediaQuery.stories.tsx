/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useMediaQuery } from './useMediaQuery.js';

export default {
  title: 'hooks/useMediaQuery',
};

const css = `
  :root {
    --min-width-420: (min-width: 420px);
  }
`;

function DemoComponent(): ReactElement {
  const isMinWidth420px = useMediaQuery('--min-width-420' as never);

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

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
