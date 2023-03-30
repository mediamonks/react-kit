import type { ReactElement } from 'react';
import { useMediaQuery } from './useMediaQuery.js';

export function Component(): ReactElement {
  // @ts-expect-error variable is defined in index.html
  const isMinWidth480px = useMediaQuery('--min-width-480');

  return <div>{isMinWidth480px ? 'large' : 'small'}</div>;
}
