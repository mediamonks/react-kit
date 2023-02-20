import { createRef, type RefObject } from 'react';
import { arrayRef } from './arrayRef.js';

describe('arrayRef', () => {
  it('should set element in RefObject<Array<unknown>>', async () => {
    const ref = createRef() as RefObject<Array<unknown>>;

    arrayRef(ref, 0)(0);
    arrayRef(ref, 1)(1);
    arrayRef(ref, 2)(2);

    expect(ref.current).toEqual([0, 1, 2]);
  });

  it('should trim Array refs when items disappear', async () => {
    const ref = createRef() as RefObject<Array<unknown>>;

    arrayRef(ref, 0)(0);
    arrayRef(ref, 2)(2);

    // Should only set 2nd element in array after 3rd element to make sure
    // it's not trimmed immediately
    arrayRef(ref, 1)(null);

    // 4th element in array should be trimmed
    arrayRef(ref, 3)(null);

    expect(ref.current).toEqual([0, null, 2]);

    arrayRef(ref, 2)(null);

    expect(ref.current).toEqual([0]);
  });

  it('should not create a new function when called multiple times', async () => {
    const ref = createRef() as RefObject<Array<unknown>>;

    // this might happen when re-rendering the parent component
    const function1 = arrayRef(ref, 0);
    const function2 = arrayRef(ref, 0);

    expect(function1).toBe(function2);
  });
});
