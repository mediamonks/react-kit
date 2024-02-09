import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useIsIntersecting } from './useIsIntersecting.js';

const meta = {
  title: 'Hooks / useIsIntersecting',
} satisfies Meta;

type Story = StoryObj<typeof meta>;

function DemoComponent(): ReactElement {
  useIsIntersecting();

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Add instructions about the hook here.</p>
      </div>
      <div>
        Value: <span className="badge rounded-pill bg-primary">{/* value */}</span>
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

export const Demo: Story = {
  render() {
    return <DemoComponent />;
  },
};
