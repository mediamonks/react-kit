/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useClientSideValue } from './useClientSideValue.js';

export default {
  title: 'hooks/useClientSideValue',
};

function DemoComponent(): ReactElement {
  const value = useClientSideValue(Date.now);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Add instructions about the hook here.</p>
      </div>

      <div className="alert alert-secondary">
        <h4 className="alert-heading">Note!</h4>
        <p className="mb-0">
          The initial value before the mount is different in a server-side rendered context, this is
          not visible in the documentation.
        </p>
      </div>

      <div>
        Value: <span className="badge rounded-pill bg-primary">{value}</span>
      </div>
    </div>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};
