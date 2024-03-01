/* eslint-disable react/jsx-no-literals */
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, type ReactElement } from 'react';
import { useForceRerender } from '../useForceRerender/useForceRerender.js';
import { useIsFirstRender } from './useIsFirstRender.js';

const meta = {
  title: 'Hooks / useIsFirstRender',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function DemoComponent(): ReactElement {
  const isFirstMount = useIsFirstRender();
  const forceRerender = useForceRerender();

  const onClick = useCallback((): void => {
    forceRerender();
  }, [forceRerender]);

  return (
    <div>
      <div>{isFirstMount ? 'This is the first render.' : 'This is not the first render.'}</div>
      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={onClick} className="btn btn-primary">
          Rerender component
        </button>
      </div>
    </div>
  );
}

export const Demo: Story = {
  render() {
    return <DemoComponent />;
  },
};
