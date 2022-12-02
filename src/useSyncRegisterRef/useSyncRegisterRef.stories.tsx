import { forwardRef } from 'react';
import type { StoryObj } from '@storybook/react';
import { useSyncRegisterRef } from './useSyncRegisterRef';
import { useRegisterRef } from '../useRegisterRef/useRegisterRef';

export default {
  title: 'useSyncRegisterRef',
};

type TransitionRefs = {
  element: HTMLDivElement;
}

type DemoComponentProps = {};

const DemoComponent = forwardRef<HTMLDivElement, DemoComponentProps>((props, forwardRef) => {
  const [refs, registerRef] = useRegisterRef<TransitionRefs>();
  useSyncRegisterRef(refs, 'element', forwardRef);

  return (
    <div ref={registerRef('element')}>
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
});

export const Demo: StoryObj<DemoComponentProps> = {
  render(args) {
    return <DemoComponent {...args} />;
  },
  name: 'demo',
  args: {
    initialValue: true,
  },
};
