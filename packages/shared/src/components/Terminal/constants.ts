import type { TerminalOptions } from './types';

export const FALLBACK = 'Loading';

export const DEFAULT_TERMINAL_OPTIONS: Readonly<TerminalOptions> = {
  lineHeight: 1.2,
  cursorBlink: true,
  cursorStyle: 'underline',
  fontSize: 12,
  fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace",
  theme: {
    background: '#181d28',
  },
};

export const DEFAULT_TERMINAL_PROPS = {
  terminalOptions: DEFAULT_TERMINAL_OPTIONS,
  initText: 'Connecting',
  isEdgeNode: false,
};
