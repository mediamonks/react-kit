/* eslint-disable react/jsx-no-literals,react/jsx-handler-names,no-console */
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForceRerender } from '../../../hooks/useForceRerender/useForceRerender.js';
import { useIsMountedState } from './useIsMountedState.js';

const meta = {
  title: 'Lifecycle / Hooks / useIsMountedState',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function DemoComponent(): JSX.Element {
  const forceRerender = useForceRerender();
  const isMounted = useIsMountedState();

  console.log(`[render] ${isMounted}`);

  useEffect(() => {
    console.log(`[useEffect] isMounted ${isMounted}`);
  });

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">
          Check the console for logged values. The first render, the values should be `false` for
          both. The second render, it should be `true` for both.
        </p>
      </div>
      <div>
        Value: <span className="badge rounded-pill bg-primary">{isMounted ? 'true' : 'false'}</span>
      </div>
      <div className="card border-dark" data-ref="test-area">
        <div className="card-header">Test Area</div>
        <div className="card-body">
          <button type="button" className="btn btn-primary" onClick={forceRerender}>
            Rerender
          </button>
        </div>
      </div>
    </div>
  );
}

export const Demo: Story = {
  render() {
    return <DemoComponent />;
  },
};
