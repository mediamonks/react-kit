import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
} from 'react';

/**
 * AsProp
 */
type AsProp<T extends ElementType> = { as?: T };

type PropsToOmit<T extends ElementType, P> = keyof (AsProp<T> & P);

export type PolymorphicComponentProps<
  T extends ElementType,
  P = Record<string, never>,
> = PropsWithChildren<P & AsProp<T>> & Omit<ComponentPropsWithoutRef<T>, PropsToOmit<T, P>>;

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

export type PolymorphicComponentPropsWithRef<
  T extends ElementType,
  P = Record<string, never>,
> = PolymorphicComponentProps<T, P> & { ref?: PolymorphicRef<T> };
