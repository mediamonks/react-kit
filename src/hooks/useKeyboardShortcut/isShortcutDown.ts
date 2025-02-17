import type { Command } from './useKeyboardShortcut.types.js';

const modifiers = ['ctrl', 'shift', 'alt', 'meta'] as const;

/**
 * Checks if the provided event matches the command.
 * - if they key code matches
 * - if all modifiers match, no more and no less
 *
 * @param event The keyboard event to check.
 * @param command The command to match against.
 * @returns True if the event matches the command, false otherwise.
 */
export function isShortcutDown(event: KeyboardEvent, command: Command): boolean {
  // Check that only the required modifiers are down
  const areModifiersCorrect = modifiers.every(
    (modifier) => event[`${modifier}Key`] === Boolean(command[`${modifier}Key`]),
  );
  if (!areModifiersCorrect) {
    return false;
  }

  // Check if the pressed key matches the command key
  const isKeyDown = event.code === command.code;

  // TODO: Add a mode where it checks against the `key` instead of `code`,
  // to allow for better support for different keyboard layouts,
  // where the same code might input a different character
  // However, this would only work with specific modifier:
  //
  // Shift will do capitals or other characters:
  // - shift+/ = ?, so '?' is the shortcut to register in that mode
  //
  // Alt/Option will do special characters:
  // - Alt+/ = ÷, so '÷' is the shortcut to register in that mode
  // - Alt+n = Dead Key for a ~ character above the next key, so cannot be used as a shortcut that way.
  //
  // Ctrl/Cmd should be fine, as they don't change the character that would be typed.
  //
  // Likely the `Command` type should be updated to add a `key` field, and both `key` and `code` should be optional.
  // Unless we can make one required based on the `mode` configuration.

  return isKeyDown;
}
