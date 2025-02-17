import { describe, expect, it } from 'vitest';
import { createCommand, convertKey, parseCommand, parseShortcut } from './parseShortcut.js';

describe('convertKey', () => {
  it('converts single lowercase letters to KeyCode format', () => {
    expect(convertKey('a')).toBe('KeyA');
    expect(convertKey('z')).toBe('KeyZ');
  });

  it('converts digits to KeyCode format', () => {
    expect(convertKey('1')).toBe('Digit1');
    expect(convertKey('9')).toBe('Digit9');
  });

  it('converts special characters using characterMappings', () => {
    expect(convertKey('.')).toBe('Period');
    expect(convertKey(',')).toBe('Comma');
  });

  it('capitalizes special keys', () => {
    expect(convertKey('space')).toBe('Space');
    expect(convertKey('enter')).toBe('Enter');
  });

  it('converts arrow keys to KeyCode format', () => {
    expect(convertKey('up')).toBe('ArrowUp');
    expect(convertKey('down')).toBe('ArrowDown');
    expect(convertKey('left')).toBe('ArrowLeft');
    expect(convertKey('right')).toBe('ArrowRight');
  });
});

describe('createCommand', () => {
  it('creates a command with no modifiers', () => {
    expect(createCommand('KeyA')).toEqual({
      code: 'KeyA',
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: false,
    });
  });

  it('creates a command with single modifier', () => {
    expect(createCommand('KeyA', ['ctrl'])).toEqual({
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: false,
      altKey: false,
      metaKey: false,
    });
    expect(createCommand('KeyA', ['cmd'])).toEqual({
      code: 'KeyA',
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: true,
    });
  });

  it('creates a command with multiple modifiers', () => {
    expect(createCommand('KeyA', ['ctrl', 'shift', 'alt'])).toEqual({
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      metaKey: false,
    });
  });
});

describe('parseCommand', () => {
  it('returns null for empty command', () => {
    expect(parseCommand('')).toBeNull();
  });

  it('parses single key commands', () => {
    expect(parseCommand('a')).toEqual({
      code: 'KeyA',
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: false,
    });
  });

  it('parses commands with modifiers', () => {
    expect(parseCommand('ctrl+a')).toEqual({
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: false,
      altKey: false,
      metaKey: false,
    });
    expect(parseCommand('cmd+a')).toEqual({
      code: 'KeyA',
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: true,
    });
  });

  it('parses commands with multiple modifiers', () => {
    expect(parseCommand('ctrl+shift+a')).toEqual({
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: true,
      altKey: false,
      metaKey: false,
    });
  });

  it('handles capital letters in commands', () => {
    expect(parseCommand('Ctrl+Shift+A')).toEqual({
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: true,
      altKey: false,
      metaKey: false,
    });
  });
});

describe('parseShortcut', () => {
  it('parses single string command', () => {
    expect(parseShortcut('a')).toEqual([
      {
        code: 'KeyA',
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        metaKey: false,
      },
    ]);
  });

  it('parses single string command with modifiers', () => {
    expect(parseShortcut('ctrl+shift+a')).toEqual([
      {
        code: 'KeyA',
        ctrlKey: true,
        shiftKey: true,
        altKey: false,
        metaKey: false,
      },
    ]);
  });

  it('parses a sequence of single-letter commands', () => {
    expect(parseShortcut(['a', 'b'])).toEqual([
      {
        code: 'KeyA',
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        metaKey: false,
      },
      {
        code: 'KeyB',
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        metaKey: false,
      },
    ]);
  });

  it('parses array of string commands', () => {
    expect(parseShortcut(['ctrl+k', 'ctrl+s'])).toEqual([
      {
        code: 'KeyK',
        ctrlKey: true,
        shiftKey: false,
        altKey: false,
        metaKey: false,
      },
      {
        code: 'KeyS',
        ctrlKey: true,
        shiftKey: false,
        altKey: false,
        metaKey: false,
      },
    ]);
  });

  it('parses array of arrays with modifiers and keys', () => {
    expect(
      parseShortcut([
        ['ctrl', 'k'],
        ['ctrl', 's'],
      ]),
    ).toEqual([
      {
        code: 'KeyK',
        ctrlKey: true,
        shiftKey: false,
        altKey: false,
        metaKey: false,
      },
      {
        code: 'KeyS',
        ctrlKey: true,
        shiftKey: false,
        altKey: false,
        metaKey: false,
      },
    ]);
  });
});
