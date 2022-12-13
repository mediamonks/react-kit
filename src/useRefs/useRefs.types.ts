import type { MutableRefObject, RefObject } from 'react';

type UnknownRecord = Record<string | number | symbol, unknown>;

/**
 * Type utility to create an object type where all values are RefObjects
 */
export type Refs<T extends UnknownRecord = UnknownRecord> = {
  [P in keyof T]: RefObject<T[P] | null>;
};

/**
 * Type utility to create an object type where all values are MutableRefObjects
 */
export type MutableRefs<T extends UnknownRecord = UnknownRecord> = {
  [P in keyof T]: MutableRefObject<T[P] | null>;
};
