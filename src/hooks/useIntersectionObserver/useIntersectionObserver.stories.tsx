/* eslint-disable react/jsx-no-bind, react/no-multi-comp, react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';

export default {
  title: 'hooks/useIntersectionObserver',
};

function DemoComponent(): ReactElement {
  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Add instructions about the hook here.</p>
      </div>
      <div>
        Value: <span className="badge rounded-pill bg-primary">3</span>
      </div>
      <div className="card border-dark" data-ref="test-area">
        <div className="card-header">Test Area</div>
        <div className="card-body">
          <p>TODO: Implement a test case for the hook.</p>
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
