import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type RefCallback,
} from 'react';
import { arrayRef } from '../utils/arrayRef/arrayRef.js';

type AutoFillChildrenProps = {
  ref: RefCallback<unknown>;
};

type AutoFillProps = {
  children:
    | ReactElement<AutoFillChildrenProps>
    | ReadonlyArray<ReactElement<AutoFillChildrenProps>>;
  axis?: 'x' | 'y';
};

/**
 * Repeats children to fill the parent element in given axis.
 */
export function AutoFill({ children, axis = 'x' }: AutoFillProps): ReactElement {
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
      setRepeatCount(Math.ceil(parentClientWidth / (offsetLeft + clientWidth)));
    } else {
      setRepeatCount(Math.ceil(parentClientHeight / (offsetTop + clientHeight)));
    }
  }, [axis]);

  useEffect(updateRepeatCount, [updateRepeatCount, children]);

  useEffect(() => {
    let raf = 0;

    function callback(): void {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateRepeatCount);
    }

    window.addEventListener('resize', callback);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', callback);
    };
  }, [updateRepeatCount]);

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
