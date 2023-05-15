import type { ReactElement } from 'react';
import { useMediaQuery } from './useMediaQuery.js';

export function UseMediaQueryComponent(): ReactElement {
  const isMinWidth480pxUsingVariable = useMediaQuery('--min-width-480');
  const isMinWidth480pxUsingQuery = useMediaQuery('(min-width: 480px)');

  return <div>{isMinWidth480pxUsingVariable && isMinWidth480pxUsingQuery ? 'large' : 'small'}</div>;
}
