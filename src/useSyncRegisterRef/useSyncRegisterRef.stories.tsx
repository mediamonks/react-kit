import { forwardRef, useState } from 'react';
import type { StoryObj } from '@storybook/react';
import { useSyncRegisterRef } from './useSyncRegisterRef';
import { useRegisterRef } from '../useRegisterRef/useRegisterRef';

export default {
  title: 'useSyncRegisterRef',
};

type TransitionRefs = {
  element: HTMLDivElement;
};

type DemoComponentProps = {};

const ChildComponent = forwardRef<HTMLDivElement, DemoComponentProps>((props, forwardRef) => {
  const [refs, registerRef] = useRegisterRef<TransitionRefs>();
  useSyncRegisterRef(refs, 'element', forwardRef);

  const [type, setType] = useState<'p' | 'span'>('p');

  return (
    <>
      <div className="btn-group" role="group" aria-label="Element Type">
        <button
          type="button"
          className={`btn btn-${type === 'p' ? 'primary' : 'secondary'}`}
          onClick={() => setType('p')}
        >
          Paragraph
        </button>
        <button
          type="button"
          className={`btn btn-${type === 'span' ? 'primary' : 'secondary'}`}
          onClick={() => setType('span')}
        >
          Span
        </button>
      </div>
      <div>
        {type === 'p' ? <p ref={registerRef('element')}>I am a paragraph</p> : null}
        {type === 'span' ? <span ref={registerRef('element')}>I am a span</span> : null}
      </div>
    </>
  );
});
const DemoComponent = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Add instructions about the hook here.</p>
      </div>
      <div>
        Value: <span className="badge rounded-pill bg-primary">{ref?.outerHTML}</span>
      </div>
      <div className="card border-dark" data-ref="test-area">
        <div className="card-header">Test Area</div>
        <div className="card-body">
          <ChildComponent ref={(ref) => setRef(ref)} />
        </div>
      </div>
    </div>
  );
};

export const Demo: StoryObj<DemoComponentProps> = {
  render(args) {
    return <DemoComponent {...args} />;
  },
  name: 'demo',
  args: {
    initialValue: true,
  },
};
