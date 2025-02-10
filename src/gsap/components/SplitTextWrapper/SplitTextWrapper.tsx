import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import {
  type ComponentPropsWithoutRef,
  type JSX,
  type JSXElementConstructor,
  type ReactNode,
  type RefObject,
} from 'react';
import { renderToString } from 'react-dom/server';
import { useObjectRef } from '../../../hooks/useObjectRef/useObjectRef.js';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

/**
 * Allowed as prop values
 */
type KnownTarget =
  | keyof JSX.IntrinsicElements
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | JSXElementConstructor<any>;

type SplitTextWrapperProps<T extends KnownTarget> = {
  ref: RefObject<SplitText>;

  /**
   * The SplitText variables
   * @link https://greensock.com/docs/v3/Plugins/SplitText
   */
  variables?: SplitText.Vars;

  /**
   * The element type to render, the default is `div`
   */
  as?: T;
  /**
   * Split the first element child of the element passed
   */
  splitFirstElementChild?: boolean;
} & ComponentPropsWithoutRef<T>;

export function SplitTextWrapper<T extends KnownTarget>({
  variables = {},
  as,
  children,
  splitFirstElementChild = false,
  ref,
  ...props
}: SplitTextWrapperProps<T>): ReactNode {
  const objectRef = useObjectRef(ref);

  /**
   * Not using useCallback on purpose so that a new SplitText instance is
   * created whenever this component rerenders the children
   */
  const onRef = (element: HTMLDivElement): void => {
    if (objectRef.current && 'isSplit' in objectRef.current && objectRef.current.isSplit) {
      return;
    }

    if (splitFirstElementChild && element.childElementCount > 1) {
      // eslint-disable-next-line no-console
      console.warn(
        "Split text wrapper should only contain 1 element when 'splitFirstElementChild' is set to true",
      );
    }

    objectRef.current = new SplitText(
      splitFirstElementChild ? element.firstElementChild : element,
      variables,
    );
  };

  const Component = as ?? 'div';

  return (
    <Component
      {...props}
      dangerouslySetInnerHTML={
        props.dangerouslySetInnerHTML ?? {
          // eslint-disable-next-line @typescript-eslint/naming-convention, react/jsx-no-useless-fragment
          __html: renderToString(<>{children}</>),
        }
      }
      // eslint-disable-next-line react/jsx-no-bind
      ref={onRef}
    />
  );
}
