/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { useClientSideValue } from './useClientSideValue.js';

export default {
  title: 'hooks/useClientSideValue',
};

const note = (
  <div className="alert alert-secondary">
    <h4 className="alert-heading">Note!</h4>
    <p className="mb-0">
      The initial value before the mount is different in a server-side rendered context, this is not
      visible in the documentation.
    </p>
  </div>
);

export const Demo: StoryObj = {
  render() {
    const value = useClientSideValue(Date.now, 0);

    return (
      <>
        <div>
          Value: <span className="badge rounded-pill bg-primary">{value}</span>
        </div>

        {note}
      </>
    );
  },
};

export const Nullable: StoryObj = {
  render() {
    const value = useClientSideValue<number | null>(Date.now, null);

    return (
      <>
        <div>
          Value: <span className="badge rounded-pill bg-primary">{value}</span>
        </div>

        {note}
      </>
    );
  },
};
