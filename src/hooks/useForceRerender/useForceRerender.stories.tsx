/* eslint-disable react/jsx-no-literals,react/jsx-handler-names */
import type { StoryObj } from '@storybook/react';
import { useForceRerender } from './useForceRerender.js';

export default {
  title: 'hooks/lifecycle/useForceRerender',
};

function DemoComponent(): JSX.Element {
  const forceRerender = useForceRerender();

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Click the &quot;Update&quot; button, and notice the date updating.</p>
      </div>
      <div className="card border-dark" data-ref="test-area">
        <div className="card-header">Test Area</div>
        <div className="card-body">
          <p>{Date.now()}</p>
          <button type="button" className="btn btn-primary" onClick={forceRerender}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
