import { describe, expect, it } from 'vitest';
import { isShortcutDown } from './isShortcutDown.js';
import type { Command } from './useKeyboardShortcut.types.js';

describe('isShortcutDown', () => {
  it('should return true when key and modifiers match exactly', () => {
    const event = new KeyboardEvent('keydown', {
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: false,
      altKey: false,
      metaKey: false,
    });

    const command: Command = {
      code: 'KeyA',
      ctrlKey: true,
    };

    expect(isShortcutDown(event, command)).toBe(true);
  });

  it('should return false when key matches but modifiers do not', () => {
    const event = new KeyboardEvent('keydown', {
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: true,
      altKey: false,
      metaKey: false,
    });

    const command: Command = {
      code: 'KeyA',
      ctrlKey: true,
    };

    expect(isShortcutDown(event, command)).toBe(false);
  });

  it('should return false when modifiers match but key does not', () => {
    const event = new KeyboardEvent('keydown', {
      code: 'KeyB',
      ctrlKey: true,
    });

    const command: Command = {
      code: 'KeyA',
      ctrlKey: true,
    };

    expect(isShortcutDown(event, command)).toBe(false);
  });

  it('should be case-insensitive for key matching with the shift key', () => {
    const event = new KeyboardEvent('keydown', {
      code: 'KeyA',
      ctrlKey: false,
      shiftKey: true,
      altKey: false,
      metaKey: false,
    });

    const command: Command = {
      code: 'KeyA',
      shiftKey: true,
    };

    expect(isShortcutDown(event, command)).toBe(true);
  });

  it('should handle multiple modifiers correctly', () => {
    const event = new KeyboardEvent('keydown', {
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      metaKey: true,
    });

    const command: Command = {
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      metaKey: true,
    };

    expect(isShortcutDown(event, command)).toBe(true);
  });

  it('should match alt+key even when it produces a special character', () => {
    // On macOS, alt+n produces ñ, but we want to match 'n'
    const event = new KeyboardEvent('keydown', {
      code: 'KeyN',
      altKey: true,
    });

    const command: Command = {
      code: 'KeyN',
      altKey: true,
    };

    expect(isShortcutDown(event, command)).toBe(true);
  });
});
