import { createRef, type RefObject } from 'react';
import { createRefArray } from './createRefArray';

describe('createRefArray', () => {
  jest.useFakeTimers();

  it('should not crash', async () => {
    const array = createRefArray();
    array[0] = createRef();

    jest.runAllTimers();
  });

  it('should keep items with null value', async () => {
    const array = createRefArray();

    array[0] = createRef();
    array[1] = null;
    array[2] = null;
    array[3] = createRef();
    array[4] = createRef();

    jest.runAllTimers();

    expect(array).toHaveLength(5);
  });

  it('should trim items with null value', async () => {
    const array = createRefArray([] as Array<RefObject<never> | null>);

    array[0] = createRef();
    array[1] = null;
    array[2] = createRef();
    array[3] = createRef();
    array[4] = null;
    array[5] = null;
    array[2] = null;

    jest.runAllTimers();

    expect(array).toHaveLength(4);
  });

  it('should accepts initial value', async () => {
    const array = createRefArray<Array<RefObject<never> | null>>([
      createRef(),
      createRef(),
      null,
      createRef(),
      null,
      null,
      null,
      null,
    ]);

    jest.runAllTimers();

    expect(array).toHaveLength(4);
  });
});
