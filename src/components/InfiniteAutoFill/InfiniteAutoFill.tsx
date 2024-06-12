import { type ComponentProps, type ReactElement } from 'react';
import { AutoFill } from '../../index.js';

type InfiniteAutoFillProps = ComponentProps<typeof AutoFill>;

/**
 * Repeats children to fill the parent element in given axis.
 */
export function InfiniteAutoFill({ children, axis }: InfiniteAutoFillProps): ReactElement {
  return (
    <>
      <AutoFill axis={axis}>{children}</AutoFill>
      {children}
    </>
  );
}
