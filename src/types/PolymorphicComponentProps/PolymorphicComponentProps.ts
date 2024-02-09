import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
} from 'react';

/**
 * PropsFromAs is a type based on the supplied as prop.
 */
type PropsFromAs<Type extends ElementType> = { as?: Type };

/**
 * MergeAndOverride is a type that omits type keys from BaseTypes that are also present in OverrideProps.
 */
type MergeAndOverride<BaseType, OverrideProps> = Omit<BaseType, keyof OverrideProps> &
  OverrideProps;

export type PolymorphicRef<Type extends ElementType> = ComponentPropsWithRef<Type>['ref'];

export type PolymorphicComponentProps<
  BaseType extends ElementType,
  OwnProps = Record<string, never>,
> = PropsWithChildren<
  MergeAndOverride<ComponentPropsWithoutRef<BaseType>, PropsFromAs<BaseType> & OwnProps>
>;

export type PolymorphicComponentPropsWithRef<
  BaseType extends ElementType,
  OwnProps = Record<string, never>,
> = PolymorphicComponentProps<BaseType, OwnProps> & { ref?: PolymorphicRef<BaseType> };
