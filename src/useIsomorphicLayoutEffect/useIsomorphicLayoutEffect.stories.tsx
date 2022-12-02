import type { StoryObj } from '@storybook/react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export default {
  title: 'useIsomorphicLayoutEffect',
};

type DemoComponentProps = {};
function DemoComponent({}: DemoComponentProps) {
  useIsomorphicLayoutEffect(() => {
    console.log('rendered');
  });

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
          <p>
            Open your console, you should see a <code>rendered</code> log.
          </p>
        </div>
      </div>
    </div>
  );
}
export const Demo: StoryObj<DemoComponentProps> = {
  render(args) {
    return <DemoComponent {...args} />;
  },
  name: 'demo',
  args: {
    initialValue: true,
  },
};
