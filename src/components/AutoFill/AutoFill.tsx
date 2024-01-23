import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type RefCallback,
} from 'react';
import { useEventListener } from '../../hooks/useEventListener/useEventListener.js';
import { useRafCallback } from '../../index.js';
import { arrayRef } from '../../utils/arrayRef/arrayRef.js';

type AutoFillChildrenProps = {
  ref: RefCallback<unknown>;
};

type AutoFillProps = {
  children:
    | ReactElement<AutoFillChildrenProps>
    | ReadonlyArray<ReactElement<AutoFillChildrenProps>>;
  additionalCloneCount?: number;
  axis?: 'x' | 'y';
};

/**
 * Repeats children to fill the parent element in given axis.
 */
export function AutoFill({
  children,
  additionalCloneCount = 0,
  axis = 'x',
}: AutoFillProps): ReactElement {
  const childrenRef = useRef<Array<unknown> | null>([]);
  const [repeatCount, setRepeatCount] = useState(0);

  const updateRepeatCount = useCallback(() => {
    const lastChild = childrenRef.current?.at(-1);

    if (!(lastChild instanceof HTMLElement) || !lastChild.parentElement) {
      return;
    }

    const { offsetTop, offsetLeft, clientWidth, clientHeight, parentElement } = lastChild;
    const { clientWidth: parentClientWidth, clientHeight: parentClientHeight } = parentElement;

    if (axis === 'x') {
      setRepeatCount(
        Math.ceil(parentClientWidth / (offsetLeft + clientWidth)) + additionalCloneCount,
      );
    } else {
      setRepeatCount(
        Math.ceil(parentClientHeight / (offsetTop + clientHeight)) + additionalCloneCount,
      );
    }
  }, [additionalCloneCount, axis]);

  useEffect(updateRepeatCount, [updateRepeatCount, children]);
  useEventListener(globalThis.window, 'resize', useRafCallback(updateRepeatCount));

  return (
    <>
      {Children.map(
        children,
        (child, index) =>
          isValidElement(child) &&
          cloneElement(child, {
            key: child.key,
            ref: arrayRef(childrenRef, index),
          }),
      )}

      {Array.from({ length: repeatCount }, (_, index) => (
        <Fragment key={index}>{children}</Fragment>
      ))}
    </>
  );
}
