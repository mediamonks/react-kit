/* eslint-disable @typescript-eslint/naming-convention */

export const modifierKeys = {
  AltLeft: 'AltLeft',
  AltRight: 'AltRight',
  ControlLeft: 'ControlLeft',
  ControlRight: 'ControlRight',
  OSLeft: 'OSLeft',
  OSRight: 'OSRight',
  ShiftLeft: 'ShiftLeft',
  ShiftRight: 'ShiftRight',
  MetaLeft: 'MetaLeft',
  MetaRight: 'MetaRight',
};

export type Modifier = keyof typeof modifierKeys;

/**
 * Keyboard event code values based on MDN documentation
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
 */
export const keyCodes = {
  // Digit Keys
  Digit0: 'Digit0',
  Digit1: 'Digit1',
  Digit2: 'Digit2',
  Digit3: 'Digit3',
  Digit4: 'Digit4',
  Digit5: 'Digit5',
  Digit6: 'Digit6',
  Digit7: 'Digit7',
  Digit8: 'Digit8',
  Digit9: 'Digit9',

  // Letter Keys
  KeyA: 'KeyA',
  KeyB: 'KeyB',
  KeyC: 'KeyC',
  KeyD: 'KeyD',
  KeyE: 'KeyE',
  KeyF: 'KeyF',
  KeyG: 'KeyG',
  KeyH: 'KeyH',
  KeyI: 'KeyI',
  KeyJ: 'KeyJ',
  KeyK: 'KeyK',
  KeyL: 'KeyL',
  KeyM: 'KeyM',
  KeyN: 'KeyN',
  KeyO: 'KeyO',
  KeyP: 'KeyP',
  KeyQ: 'KeyQ',
  KeyR: 'KeyR',
  KeyS: 'KeyS',
  KeyT: 'KeyT',
  KeyU: 'KeyU',
  KeyV: 'KeyV',
  KeyW: 'KeyW',
  KeyX: 'KeyX',
  KeyY: 'KeyY',
  KeyZ: 'KeyZ',

  // Function Keys
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  F4: 'F4',
  F5: 'F5',
  F6: 'F6',
  F7: 'F7',
  F8: 'F8',
  F9: 'F9',
  F10: 'F10',
  F11: 'F11',
  F12: 'F12',
  F13: 'F13',
  F14: 'F14',
  F15: 'F15',
  F16: 'F16',
  F17: 'F17',
  F18: 'F18',
  F19: 'F19',
  F20: 'F20',
  F21: 'F21',
  F22: 'F22',
  F23: 'F23',
  F24: 'F24',

  // Navigation Keys
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  End: 'End',
  Home: 'Home',
  PageDown: 'PageDown',
  PageUp: 'PageUp',

  // Editing Keys
  Space: 'Space',
  Backspace: 'Backspace',
  Delete: 'Delete',
  Enter: 'Enter',
  Insert: 'Insert',
  Tab: 'Tab',

  // UI Keys
  Escape: 'Escape',
  CapsLock: 'CapsLock',
  PrintScreen: 'PrintScreen',
  ScrollLock: 'ScrollLock',
  Pause: 'Pause',

  // Modifier Keys
  ...modifierKeys,

  // Punctuation Keys
  Backquote: 'Backquote',
  BracketLeft: 'BracketLeft',
  BracketRight: 'BracketRight',
  Comma: 'Comma',
  Period: 'Period',
  Semicolon: 'Semicolon',
  Quote: 'Quote',
  Backslash: 'Backslash',
  Slash: 'Slash',
  Minus: 'Minus',
  Equal: 'Equal',

  // Numpad Keys
  NumLock: 'NumLock',
  Numpad0: 'Numpad0',
  Numpad1: 'Numpad1',
  Numpad2: 'Numpad2',
  Numpad3: 'Numpad3',
  Numpad4: 'Numpad4',
  Numpad5: 'Numpad5',
  Numpad6: 'Numpad6',
  Numpad7: 'Numpad7',
  Numpad8: 'Numpad8',
  Numpad9: 'Numpad9',
  NumpadAdd: 'NumpadAdd',
  NumpadDecimal: 'NumpadDecimal',
  NumpadDivide: 'NumpadDivide',
  NumpadEnter: 'NumpadEnter',
  NumpadEqual: 'NumpadEqual',
  NumpadMultiply: 'NumpadMultiply',
  NumpadSubtract: 'NumpadSubtract',
  NumpadComma: 'NumpadComma',

  // Media Keys
  MediaPlayPause: 'MediaPlayPause',
  MediaStop: 'MediaStop',
  MediaTrackNext: 'MediaTrackNext',
  MediaTrackPrevious: 'MediaTrackPrevious',
  AudioVolumeMute: 'AudioVolumeMute',
  AudioVolumeDown: 'AudioVolumeDown',
  AudioVolumeUp: 'AudioVolumeUp',

  // Browser Keys
  BrowserBack: 'BrowserBack',
  BrowserFavorites: 'BrowserFavorites',
  BrowserForward: 'BrowserForward',
  BrowserHome: 'BrowserHome',
  BrowserRefresh: 'BrowserRefresh',
  BrowserSearch: 'BrowserSearch',
  BrowserStop: 'BrowserStop',

  // Special Keys
  LaunchApp1: 'LaunchApp1',
  LaunchApp2: 'LaunchApp2',
  LaunchMail: 'LaunchMail',
  MediaSelect: 'MediaSelect',
  ContextMenu: 'ContextMenu',
  Power: 'Power',
  Sleep: 'Sleep',
  WakeUp: 'WakeUp',

  // International Keys
  IntlBackslash: 'IntlBackslash',
  IntlRo: 'IntlRo',
  IntlYen: 'IntlYen',
  KanaMode: 'KanaMode',
  Lang1: 'Lang1',
  Lang2: 'Lang2',
  Convert: 'Convert',
  NonConvert: 'NonConvert',
} as const;

export type KeyCode = keyof typeof keyCodes;

export const characterMappings = {
  '`': keyCodes.Backquote,
  '-': keyCodes.Minus,
  '=': keyCodes.Equal,
  '[': keyCodes.BracketLeft,
  ']': keyCodes.BracketRight,
  '\\': keyCodes.Backslash,
  ';': keyCodes.Semicolon,
  "'": keyCodes.Quote,
  ',': keyCodes.Comma,
  '.': keyCodes.Period,
  '/': keyCodes.Slash,
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
} as const;

export type CharacterKey = keyof typeof characterMappings;
