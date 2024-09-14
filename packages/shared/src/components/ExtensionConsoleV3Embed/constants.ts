import type { ExtensionConsoleV3EmbedProps } from './types';

export const DEFAULT_PROPS: Omit<ExtensionConsoleV3EmbedProps, 'url'> = {
  width: '100%',
  height: '100%',
  name: 'consolev3',
  sync: false,
} as const;
