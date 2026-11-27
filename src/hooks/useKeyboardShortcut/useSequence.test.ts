/* eslint-disable unicorn/consistent-function-scoping */
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useSequence } from './useSequence.js';

describe('useSequence', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call callback when sequence is matched in order', () => {
    const items = ['a', 'b', 'c'];
    const callback = vi.fn();
    const predicate = (item: string, input: string): boolean => item === input;

    const { result } = renderHook(() => useSequence(items, predicate, callback));

    result.current.check('a');
    result.current.check('b');
    result.current.check('c');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('c');
  });

  it('should reset sequence when wrong input is provided', () => {
    const items = ['a', 'b', 'c'];
    const callback = vi.fn();
    const predicate = (item: string, input: string): boolean | undefined => item === input;

    const { result } = renderHook(() => useSequence(items, predicate, callback));

    result.current.check('a');
    // Wrong input
    result.current.check('x');
    result.current.check('b');
    result.current.check('c');

    expect(callback).not.toHaveBeenCalled();
  });

  it('should reset sequence after debounce timeout', () => {
    const items = ['a', 'b', 'c'];
    const callback = vi.fn();
    const predicate = (item: string, input: string): boolean => item === input;
    const debounce = 1000;

    const { result } = renderHook(() => useSequence(items, predicate, callback, debounce));

    result.current.check('a');
    result.current.check('b');

    vi.advanceTimersByTime(debounce + 100);

    result.current.check('c');
    expect(callback).not.toHaveBeenCalled();
  });

  it('should not reset sequence when undefined is returned from predicate', () => {
    const items = ['a', 'b'];
    const callback = vi.fn();
    const predicate = (item: string, input: string): boolean | undefined =>
      input === 'skip' ? undefined : item === input;

    const { result } = renderHook(() => useSequence(items, predicate, callback));

    result.current.check('a');
    result.current.check('skip');
    result.current.check('b');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('b');
  });

  it('should restart timer on each valid input', () => {
    const items = ['a', 'b', 'c'];
    const callback = vi.fn();
    const predicate = (item: string, input: string): boolean => item === input;
    const debounce = 1000;

    const { result } = renderHook(() => useSequence(items, predicate, callback, debounce));

    result.current.check('a');
    vi.advanceTimersByTime(800);
    result.current.check('b');
    vi.advanceTimersByTime(800);
    result.current.check('c');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('c');
  });
});
