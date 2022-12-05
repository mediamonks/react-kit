import { memoize } from 'lodash-es';
import { useCallback, useRef } from 'react';

// appends the `[]` after the existing key when the type is an Array
export type RefKey<T, K extends string> = T extends ReadonlyArray<unknown> ? `${K}[]` : K;
// only returns non-array keys
export type RefKeyPlain<T, K extends string> = T extends ReadonlyArray<unknown> ? never : K;
// only returns array keys
export type RefKeyList<T, K extends string> = T extends ReadonlyArray<unknown> ? `${K}[]` : never;

// get modified and optionally filtered object keys
export type RefKeys<
  T extends Record<string, unknown>,
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

function arrayTrimEnd<T extends Array<unknown>>(array: T): void {
  const existingElementIndex = [...array].reverse().findIndex(Boolean);
  const lastExistingItemIndex =
    existingElementIndex === -1 ? 0 : array.length - existingElementIndex;
  array.splice(lastExistingItemIndex);
}

/**
 * A helper hook that allows you to easily register and access refs by "name", including ref collections.
 *
 * Usage:
 * ```
 *  // this gives auto-completion when registering or accessing the refs
 *  type RefMap = {
 *    element: HTMLDivElement;
 *    elements: ReadonlyArray<HTMLElement>;
 *  };
 *
 *  // put this hook in your component
 *  const [refs, registerRef] = useRegisterRef<RefMap>();
 *
 *  // use the object itself
 *  doSomethingWithRefs(refs); // the complete object of all registered refs as HTML Elements
 *
 *  // or individual refs
 *  useEffect(() => {
 *    console.log(refs.elements); // the 3 <li> elements collected in the array
 *  }, [refs.elements]);
 *
 *
 *  // use `registerRef(...)` in your JSX to collect the ref
 *  <div ref={registerRef('element')}>
 *    {Array.from({ length: 3 }).map((_, index) => (
 *      // array-type refs are required to append `[]` to the key and provide an index when registering
 *      <li key={index} ref={registerRef('elements[]', index)}>{index}</li>
 *    ))}
 *  </div>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function useRegisterRef<T extends Record<string, unknown>>() {
  // const [refs, setRefs] = useState({} as T);
  const refs = useRef({} as T);

  // use method overloading to make the 2nd `index` parameter only there and required for array-like
  // refs, and leave it out for plain single element refs;
  function registerRefInternal<N extends RefKeys<T, 'plain'>>(
    name: N,
  ): (ref: Exclude<T[N], undefined> | null) => void;
  function registerRefInternal<N extends RefKeys<T, 'list'>>(
    name: N,
    index: number,
  ): (ref: Exclude<T[N], undefined> | null) => void;
  function registerRefInternal<N extends RefKeys<T>>(
    name: N,
    index?: number,
  ): (ref: Exclude<T[N], undefined> | null) => void {
    return (ref: Exclude<T[N], undefined> | null) => {
      // array mode
      if (name.endsWith('[]')) {
        const cleanName = name.replace('[]', '') as N;

        if (!refs.current[cleanName]) {
          refs.current[cleanName] = [] as T[N];
        }

        // clone array so we can track changes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const slot = [...(refs.current[cleanName] as ReadonlyArray<unknown>)];

        if (index === undefined) {
          throw new Error(
            `Missing "index" parameter for ref "${name}", Array refs should always provide an index`,
          );
        }
        slot[index] = ref;

        // if we set something to `null`, try to clean up the array
        if (!ref) {
          arrayTrimEnd(slot);
        }

        refs.current[cleanName] = slot as T[N];
      }
      // plain mode
      else {
        // we can set refs to null, even though the type doesn't reflect this
        refs.current[name] = ref as Exclude<typeof ref, null>;
      }
    };
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registerRef = useCallback(
    // memoize the function creation so it doesn't cause re-renders when they are passed to the `ref` attribute
    memoize(registerRefInternal, (name: string, index?: number) => `${name}-${index ?? ''}`),
    [],
  );
  return [refs.current, registerRef] as const;
}
