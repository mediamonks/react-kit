import type { StoryObj } from '@storybook/react';
import type { CSSProperties, ReactElement } from 'react';
import { useMediaQuery } from './useMediaQuery.js';

export default {
  title: 'hooks/useMediaQuery',
};

function DemoComponent(): ReactElement {
  const isMinWidth420px = useMediaQuery('--min-width-420' as never);

  return (
    <div
      style={
        {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '--min-width-420': '(min-width: 420px)',
        } as CSSProperties
      }
    >
      {isMinWidth420px && 'Viewport is larger than 420px wide'}
    </div>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
