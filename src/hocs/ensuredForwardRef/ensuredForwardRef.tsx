import {
  createRef,
  forwardRef,
  useMemo,
  type ForwardRefExoticComponent,
  type MutableRefObject,
  type PropsWithoutRef,
  type ReactElement,
  type RefAttributes,
} from 'react';

export interface EnsuredForwardRefRenderFunction<T, P = Record<string | number | symbol, unknown>> {
  (props: P, ref: MutableRefObject<T | null>): ReactElement | null;
  displayName?: string | undefined;

  // explicit rejected with `never` required due to
  // https://github.com/microsoft/TypeScript/issues/36826
  /**
   * defaultProps are not supported on render functions
   */
  defaultProps?: never;
  propTypes?: never;
}

export function ensuredForwardRef<T, P = Record<string | number | symbol, unknown>>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component: EnsuredForwardRefRenderFunction<T, P>,
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
  // eslint-disable-next-line react/display-name
  return forwardRef<T, P>((props, ref) => {
    const refObject = useMemo(() => {
      if (ref !== null && 'current' in ref) {
        return ref;
      }

      return new Proxy(createRef<T>(), {
        set(target, prop, newValue): boolean {
          if (prop !== 'current') {
            return false;
          }

          ref?.(newValue);
          return true;
        },
      });
    }, [ref]);

    return Component(props, refObject);
  });
}
