import { type ReactElement, type RefCallback } from 'react';
import { AutoFill } from '../../index.js';

type InfiniteAutoFillChildrenProps = {
  ref: RefCallback<unknown>;
};

type InfiniteAutoFillProps = {
  children:
    | ReactElement<InfiniteAutoFillChildrenProps>
    | ReadonlyArray<ReactElement<InfiniteAutoFillChildrenProps>>;
  axis?: 'x' | 'y';
};

/**
 * Repeats children to fill the parent element in given axis.
 */
export function InfiniteAutoFill({ children, axis = 'x' }: InfiniteAutoFillProps): ReactElement {
  return (
    <>
      <AutoFill axis={axis}>{children}</AutoFill>
      {children}
    </>
  );
}
