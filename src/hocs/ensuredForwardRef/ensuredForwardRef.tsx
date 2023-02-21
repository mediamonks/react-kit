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
      // At runtime, ref _could_ be undefined when this component is rendered
      // from a framework level that doesn't leverage typescript.
      // Example is Next.js with dynamic imports.
      // This can't be covered with tests.
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (ref !== null && ref !== undefined && 'current' in ref) {
        return ref;
      }

      return new Proxy(createRef<T>() as MutableRefObject<T>, {
        set(target, prop, newValue): boolean {
          if (prop !== 'current') {
            return false;
          }

          // Update proxy ref value
          target.current = newValue;

          // Call ref function when it exists
          ref?.(newValue);
          return true;
        },
      });
    }, [ref]);

    return Component(props, refObject);
  });
}
