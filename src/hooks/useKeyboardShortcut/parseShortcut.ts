import { capitalize } from 'es-toolkit/string';
import { characterMappings } from './keyCodes.js';
import type {
  CombinedCommand,
  Command,
  Key,
  Modifiers,
  SimpleKey,
  SimpleShortcut,
} from './useKeyboardShortcut.types.js';

const modifierNames = ['ctrl', 'shift', 'alt', 'meta', 'cmd'] as const;

function isModifier(key: string): key is Modifiers {
  return modifierNames.includes(key as Modifiers);
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
 * Creates a command object from a key and optional modifiers.
 *
 * @param key - The key to create the command from.
 * @param modifiers - Optional array of modifiers to include in the command.
 * @returns A command object with the specified key and modifiers.
 */
export function createCommand(key: Key, modifiers: Array<Modifiers> = []): Command {
  const modifiersCheck = modifiers.toString().toLowerCase();

  const result: Command = {
    code: key,
    ctrlKey: modifiersCheck.includes('ctrl'),
    shiftKey: modifiersCheck.includes('shift'),
    altKey: modifiersCheck.includes('alt'),
    metaKey: modifiersCheck.includes('meta') || modifiersCheck.includes('cmd'),
  };

  return result;
}

/**
 * Converts a string key to a Key enum value.
 *
 * @param key - The key to convert.
 * @returns The converted key as a Key enum value.
 */
export function convertKey(key: string): Key {
  // Convert single character keys to KeyCode format
  if (key.length === 1 && /[a-z]/u.test(key)) {
    return `Key${key.toUpperCase()}` as Key;
  }

  // Convert digits to KeyCode format
  if (/^\d$/u.test(key)) {
    return `Digit${key}` as Key;
  }

  // Convert special characters to KeyCode format
  if (key in characterMappings) {
    return characterMappings[key as keyof typeof characterMappings] as Key;
  }

  // For special keys like 'space', 'enter', etc.
  // Convert to proper case for KeyCode
  return capitalize(key) as Key;
}

/**
 * Parses a command string into a command object.
 *
 * Input can be:
 * - a single key (e.g. 'a')
 * - a combination of keys (e.g. 'ctrl+a', 'ctrl+space')
 * - capital letters (e.g. 'Ctrl+A')
 *
 * @param command The command string to parse.
 * @returns The parsed command, or null if the input is invalid.
 */
export function parseCommand(command: string): Command | null {
  if (!command) {
    return null;
  }

  // reversing makes it easier to destructure
  const [key, ...modifiers] = command.toLowerCase().split('+').toReversed();

  return createCommand(convertKey(key), modifiers as Array<Modifiers>);
}

/**
 * Input can be:
 * - a single command (e.g. 'a', or 'ctrl+a', or ['ctrl', 'a'])
 * - a sequence of commands (e.g. ['ctrl+k', 'ctrl+s'], or [['ctrl', 'k'], ['ctrl', 's']])
 *
 * @param command The command to parse, can be in any supported format.
 * @returns An array of commands.
 */
export function parseShortcut(command: SimpleShortcut): Array<Command> {
  if (typeof command === 'string') {
    // 1.
    // 'ctrl+shift+k'
    // to 2
    // ['ctrl+shift+k']
    //
    // or
    // 'g'
    // to 4
    // ['g']
    return parseShortcut([command]);
  }

  if (isArrayOfStrings(command)) {
    // now we can have either a sequence of individual keys, or a shortcut with modifiers, or mixed

    if (isArrayOfCombinedCommands(command)) {
      // 2.
      // ['ctrl+k', 'ctrl+s']
      // to 5
      // [['ctrl', 'k'], ['ctrl', 's']]
      return parseShortcut(
        command.map((commandItem) => commandItem.split('+') as [...Array<Modifiers>, SimpleKey]),
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (isModifier(command.at(0)!)) {
      // 3.
      // ['ctrl', 'shift', 'a']
      // to 5
      // [['ctrl', 'shift', 'a']]

      return parseShortcut([command]);
    }

    if (isAllKeys(command)) {
      // 4.
      // ['g', 'i']

      return (command as Array<SimpleKey>)
        .map((key) => createCommand(convertKey(key)))
        .filter(Boolean) as Array<Command>;
    }
  }

  if (isArrayOfArrays(command)) {
    // 5.
    // [['ctrl', 'shift', 'a'], ['ctrl', 'shift', 'g']]

    return command
      .map((commandItem) => {
        // reversing makes it easier to destructure
        const [key, ...modifiers] = commandItem.toReversed();

        return createCommand(convertKey(key), modifiers as Array<Modifiers>);
      })
      .filter(Boolean) as Array<Command>;
  }

  return [];
}
