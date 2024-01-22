import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
} from 'react';

/*
 * AsProp is a type based on the supplied as prop.
 */
type AsProp<Types extends ElementType> = { as?: Types };

/*
 * MergeAndOverride is a type that omits type keys from BaseTypes that are also present in OverrideProps.
 */
type MergeAndOverride<BaseTypes, OverrideProps> = Omit<BaseTypes, keyof OverrideProps> &
  OverrideProps;

export type PolymorphicRef<Types extends ElementType> = ComponentPropsWithRef<Types>['ref'];

export type PolymorphicComponentProps<
  BaseTypes extends ElementType,
  OwnProps = Record<string, never>,
> = PropsWithChildren<
  MergeAndOverride<ComponentPropsWithoutRef<BaseTypes>, AsProp<BaseTypes> & OwnProps>
>;

export type PolymorphicComponentPropsWithRef<
  BaseTypes extends ElementType,
  OwnProps = Record<string, never>,
> = PolymorphicComponentProps<BaseTypes, OwnProps> & { ref?: PolymorphicRef<BaseTypes> };
