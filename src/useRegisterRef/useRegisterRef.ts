import { useCallback, useState } from 'react';
import { memoize } from 'lodash-es';

// appends the `[]` after the existing key when the type is an Array
export type RefKey<T, K extends string> = T extends ReadonlyArray<any> ? `${K}[]` : K;
// only returns non-array keys
export type RefKeyPlain<T, K extends string> = T extends ReadonlyArray<any> ? never : K;
// only returns array keys
export type RefKeyList<T, K extends string> = T extends ReadonlyArray<any> ? `${K}[]` : never;

// get modified and optionally filtered object keys
export type RefKeys<
  T extends Record<string, any>,
  M extends 'all' | 'list' | 'plain' = 'all',
> = Exclude<
  keyof {
    [P in Exclude<keyof T, number | symbol> as M extends 'all'
      ? RefKey<T[P], P>
      : M extends 'plain'
      ? RefKeyPlain<T[P], P>
      : RefKeyList<T[P], P>]: T[P];
  },
  number | symbol
>;

function arrayTrimEnd<T extends Array<unknown>>(array: T) {
  const existingElementIndex = [...array].reverse().findIndex((val) => Boolean(val));
  const lastExistingItemIndex =
    existingElementIndex === -1 ? 0 : array.length - existingElementIndex;
  array.splice(lastExistingItemIndex);
}

/**
 * A helper hook that allows you to easily register and access refs by "name", even supports arrays.
 *
 * Usage:
 * ```
 *  // this gives auto-completion when registering or accessing the refs
 *  type RefMap = {
 *    element: HTMLDivElement;
 *    elements: Array<HTMLElement>;
 *  };
 *
 *  // put this hook in your component
 *  const [refs, registerRef] = useRegisterRef<RefMap>();
 *
 *  // use the object itself
 *  doSomethingWithRefs(refs); // the complete object of all registered refs as HTML Elements
 *
 *  // or individual refs
 *  console.log(refs.elements); // the 3 <li> elements collected in the array
 *
 *  // use `registerRef(...)` in your JSX to collect the ref
 *  <div ref={registerRef('element')}>
 *    {Array.from({ length: 3 }).map((_, index) => (
 *      // array-type refs are required to append `[]` when registering
 *      <li key={index} ref={registerRef('elements[]')}>{index}</li>
 *    ))}
 *  </div>
 * ```
 */
export function useRegisterRef<T extends Record<string, unknown>>() {
  const [refs, setRefs] = useState({} as T);

  // use method overloading to make the 2nd `index` parameter only there and required for array-like
  // refs, and leave it out for plain single element refs;
  function registerRefInternal<N extends RefKeys<T, 'plain'>>(
    name: N,
  ): (ref: Exclude<T[N], undefined>) => void;
  function registerRefInternal<N extends RefKeys<T, 'list'>>(
    name: N,
    index: number,
  ): (ref: Exclude<T[N], undefined>) => void;
  function registerRefInternal<N extends RefKeys<T>>(
    name: N,
    index?: number,
  ): (ref: Exclude<T[N], undefined>) => void {
    return (ref: Exclude<T[N], undefined>) => {
      setRefs((oldRefs) => {
        // array mode
        if (name.endsWith('[]')) {
          const cleanName = name.replace('[]', '') as N;
          if (!oldRefs[cleanName]) oldRefs[cleanName] = [] as T[N];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const slot = oldRefs[cleanName] as Array<any>;
          slot[index!] = ref;

          // if we set something to `null`, try to clean up the array
          if (!ref) {
            arrayTrimEnd(slot);
          }
        }
        // plain mode
        else {
          oldRefs[name] = ref;
        }
        // force re-render
        return { ...oldRefs };
      });
    };
  }

  const registerRef = useCallback(
    // memoize the function creation so it doesn't cause re-renders when they are passed to the `ref` attribute
    memoize(registerRefInternal, (...args) => `${args[0]}-${args[1]}`),
    [],
  );
  return [refs, registerRef] as const;
}
