import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import type { KeyCode, modifierKeys } from './keyCodes.js';
import { useKeyboardShortcut } from './useKeyboardShortcut.js';

const createKeyboardEvent = (
  code: KeyCode | keyof typeof modifierKeys,
  options: Partial<KeyboardEvent> = {},
): KeyboardEvent =>
  new KeyboardEvent('keydown', {
    code,
    bubbles: true,
    ...options,
  });

describe('useKeyboardShortcut', () => {
  let callback: ReturnType<typeof vi.fn>;
  let mockRef: { current: HTMLDivElement };

  beforeEach(() => {
    callback = vi.fn();
    mockRef = {
      current: document.createElement('div'),
    };
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should trigger callback when shortcut matches', () => {
    renderHook(() => {
      useKeyboardShortcut(
        {
          ref: mockRef,
          command: 'ctrl+a',
        },
        callback,
      );
    });

    mockRef.current.dispatchEvent(
      createKeyboardEvent('KeyA', {
        ctrlKey: true,
      }),
    );

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not trigger callback when shortcut does not match', () => {
    renderHook(() => {
      useKeyboardShortcut(
        {
          ref: mockRef,
          command: 'ctrl+a',
        },
        callback,
      );
    });

    mockRef.current.dispatchEvent(
      createKeyboardEvent('KeyB', {
        ctrlKey: true,
      }),
    );

    expect(callback).not.toHaveBeenCalled();
  });

  it('should ignore shortcuts in input elements when ignoreWhenInputFocussed is true', () => {
    const input = document.createElement('input');
    mockRef.current.append(input);

    renderHook(() => {
      useKeyboardShortcut(
        {
          ref: mockRef,
          command: 'a',
          ignoreWhenInputFocussed: true,
        },
        callback,
      );
    });

    const event = createKeyboardEvent('KeyA');
    Object.defineProperty(event, 'target', { value: input });
    mockRef.current.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle shortcuts in input elements when ignoreWhenInputFocussed is false', () => {
    const input = document.createElement('input');
    mockRef.current.append(input);

    renderHook(() => {
      useKeyboardShortcut(
        {
          ref: mockRef,
          command: 'a',
          ignoreWhenInputFocussed: false,
        },
        callback,
      );
    });

    const event = createKeyboardEvent('KeyA');
    Object.defineProperty(event, 'target', { value: input });
    mockRef.current.dispatchEvent(event);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should stop event propagation when shouldStopPropagation is true', () => {
    const stopPropagation = vi.fn();

    renderHook(() => {
      useKeyboardShortcut(
        {
          ref: mockRef,
          command: 'a',
          shouldStopPropagation: true,
        },
        callback,
      );
    });

    const event = createKeyboardEvent('KeyA');
    Object.defineProperty(event, 'stopPropagation', { value: stopPropagation });
    mockRef.current.dispatchEvent(event);

    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('should prevent default when shouldPreventDefault is true', () => {
    const preventDefault = vi.fn();

    renderHook(() => {
      useKeyboardShortcut(
        {
          ref: mockRef,
          command: 'a',
          shouldPreventDefault: true,
        },
        callback,
      );
    });

    const event = createKeyboardEvent('KeyA');
    Object.defineProperty(event, 'preventDefault', { value: preventDefault });
    mockRef.current.dispatchEvent(event);

    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should handle platform-specific commands', () => {
    renderHook(() => {
      useKeyboardShortcut(
        {
          ref: mockRef,
          windowsCommand: 'ctrl+a',
          macOsCommand: 'meta+a',
          convertPlatforms: true,
        },
        callback,
      );
    });

    // Test Windows shortcut
    mockRef.current.dispatchEvent(
      createKeyboardEvent('KeyA', {
        ctrlKey: true,
      }),
    );

    // Test macOS shortcut
    mockRef.current.dispatchEvent(
      createKeyboardEvent('KeyA', {
        metaKey: true,
      }),
    );

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should ignore modifier key events', () => {
    renderHook(() => {
      useKeyboardShortcut(
        {
          ref: mockRef,
          command: ['ctrl+a', 'ctrl+b'],
        },
        callback,
      );
    });

    mockRef.current.dispatchEvent(createKeyboardEvent('ControlLeft', { ctrlKey: true }));
    mockRef.current.dispatchEvent(createKeyboardEvent('KeyA', { ctrlKey: true }));
    mockRef.current.dispatchEvent(createKeyboardEvent('ControlLeft', { ctrlKey: true }));
    mockRef.current.dispatchEvent(createKeyboardEvent('KeyB', { ctrlKey: true }));

    expect(callback).toHaveBeenCalledOnce();
  });

  it('should trigger the konami code', () => {
    renderHook(() => {
      useKeyboardShortcut(
        {
          ref: mockRef,
          command: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'],
        },
        callback,
      );
    });

    mockRef.current.dispatchEvent(createKeyboardEvent('ArrowUp'));
    mockRef.current.dispatchEvent(createKeyboardEvent('ArrowUp'));
    mockRef.current.dispatchEvent(createKeyboardEvent('ArrowDown'));
    mockRef.current.dispatchEvent(createKeyboardEvent('ArrowDown'));
    mockRef.current.dispatchEvent(createKeyboardEvent('ArrowLeft'));
    mockRef.current.dispatchEvent(createKeyboardEvent('ArrowRight'));
    mockRef.current.dispatchEvent(createKeyboardEvent('ArrowLeft'));
    mockRef.current.dispatchEvent(createKeyboardEvent('ArrowRight'));
    mockRef.current.dispatchEvent(createKeyboardEvent('KeyB'));
    mockRef.current.dispatchEvent(createKeyboardEvent('KeyA'));

    expect(callback).toHaveBeenCalledOnce();
  });

  describe('with shortcuts as the first parameter', () => {
    it(`should support 'a'`, () => {
      renderHook(() => {
        useKeyboardShortcut('a', callback);
      });

      document.body.dispatchEvent(createKeyboardEvent('KeyA'));

      expect(callback).toHaveBeenCalledOnce();
    });

    it(`should support ['a']`, () => {
      renderHook(() => {
        useKeyboardShortcut(['a'], callback);
      });

      document.body.dispatchEvent(createKeyboardEvent('KeyA'));

      expect(callback).toHaveBeenCalledOnce();
    });

    it(`should support ['a', 'b']`, () => {
      renderHook(() => {
        useKeyboardShortcut(['a', 'b'], callback);
      });

      document.body.dispatchEvent(createKeyboardEvent('KeyA'));
      document.body.dispatchEvent(createKeyboardEvent('KeyB'));

      expect(callback).toHaveBeenCalledOnce();
    });

    it(`should support 'cmd+a'`, () => {
      renderHook(() => {
        useKeyboardShortcut('cmd+a', callback);
      });

      document.body.dispatchEvent(createKeyboardEvent('KeyA', { metaKey: true }));

      expect(callback).toHaveBeenCalledOnce();
    });

    it(`should support ['cmd+k', 'cmd+s']`, () => {
      renderHook(() => {
        useKeyboardShortcut(['cmd+k', 'cmd+s'], callback);
      });

      document.body.dispatchEvent(createKeyboardEvent('KeyK', { metaKey: true }));
      document.body.dispatchEvent(createKeyboardEvent('KeyS', { metaKey: true }));

      expect(callback).toHaveBeenCalledOnce();
    });
  });
});
