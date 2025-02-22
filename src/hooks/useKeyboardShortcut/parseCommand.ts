import { capitalize } from 'es-toolkit/string';
import { characterMappings } from './keyCodes.js';
import type {
  CombinedCommand,
  Command,
  Key,
  Modifier,
  SimpleKey,
  SimpleShortcut,
} from './useKeyboardShortcut.types.js';

const modifierNames = ['ctrl', 'shift', 'alt', 'meta', 'cmd'] as const;

function isModifier(key: string): key is Modifier {
  return modifierNames.includes(key as Modifier);
}

export function convertCommand(key: Key, modifiers?: Array<Modifier>): Command {
  const result: Command = {
    key,
    ctrlKey: modifiers?.includes('ctrl'),
    shiftKey: modifiers?.includes('shift'),
    altKey: modifiers?.includes('alt'),
    metaKey: modifiers?.includes('meta'),
  };

  return result;
}

export function convertKey(key: string): Key {
  // Convert single character keys to KeyCode format
  if (key.length === 1 && /[a-z]/u.test(key)) {
    return `Key${key.toUpperCase()}` as Key;
  }
  if (/^\d$/u.test(key)) {
    return `Digit${key}` as Key;
  }
  if (key in characterMappings) {
    return characterMappings[key as keyof typeof characterMappings] as Key;
  }
  // For special keys like 'space', 'enter', etc.
  // Convert to proper case for KeyCode
  return capitalize(key) as Key;
}

/**
 * Input can be:
 * - a single key (e.g. 'a')
 * - a combination of keys (e.g. 'ctrl+a', 'ctrl+space')
 * - capital letters (e.g. 'Ctrl+A')
 */
export function parseCommand(command: string): Command | null {
  if (!command) {
    return null;
  }

  const [key, ...modifiers] = command.toLowerCase().split('+').toReversed();

  return convertCommand(convertKey(key), modifiers as Array<Modifier>);
}

function isArrayOfStrings(array: Array<unknown>): array is Array<string> {
  return array.every((item) => typeof item === 'string');
}

function isArrayOfArrays(array: Array<unknown>): array is Array<Array<string>> {
  return array.every((item) => Array.isArray(item) && isArrayOfStrings(item));
}

function isArrayOfCombinedCommands(array: Array<string>): array is Array<CombinedCommand> {
  return array.every((item) => item.includes('+'));
}

function isAllKeys(array: Array<unknown>): array is Array<SimpleKey> {
  return array.every((item) => !isModifier(item as string));
}

/**
 * Input can be:
 * - a single command (e.g. 'a', or 'ctrl+a', or ['ctrl', 'a'])
 * - a sequence of commands (e.g. ['ctrl+k', 'ctrl+s'], or [['ctrl', 'k'], ['ctrl', 's']])
 */
export function parseShortcut(command: SimpleShortcut): Array<Command> {
  if (typeof command === 'string') {
    // 'ctrl+shift+k'
    // ['ctrl+shift+k']
    return parseShortcut([command]);
  }

  if (isArrayOfStrings(command)) {
    // now we can have either a sequence of individual keys, or a shortcut with modifiers, or mixed

    if (isArrayOfCombinedCommands(command)) {
      // ['ctrl+k', 'ctrl+s']
      // [['ctrl', 'k'], ['ctrl', 's']]
      return parseShortcut(
        command.map((commandItem) => commandItem.split('+') as [...Array<Modifier>, SimpleKey]),
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (isModifier(command.at(0)!)) {
      // ['ctrl', 'shift', 'a']
      // [['ctrl', 'shift', 'a']]

      return parseShortcut([command]);
    }

    if (isAllKeys(command)) {
      // ['g', 'i']

      return (command as Array<SimpleKey>)
        .map((key) => convertCommand(convertKey(key)))
        .filter(Boolean) as Array<Command>;
    }
  }

  if (isArrayOfArrays(command)) {
    // [['ctrl', 'shift', 'a'], ['ctrl', 'shift', 'g']]
    return command
      .map((commandItem) => {
        const [key, ...modifiers] = commandItem.toReversed();
        return convertCommand(convertKey(key), modifiers as Array<Modifier>);
      })
      .filter(Boolean) as Array<Command>;
  }

  return [];
}
