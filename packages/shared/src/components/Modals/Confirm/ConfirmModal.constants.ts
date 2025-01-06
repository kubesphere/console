import { Question, Exclamation, Failure } from '@kubed/icons';

export const DEFAULT_TITLE_ICON_PROPS = {
  size: 20,
  color: '#fff',
} as const;

export const TITLE_ICON_TYPE_MAP = {
  info: {
    icon: Question,
    fillColorName: 'blue',
  },
  warning: {
    icon: Exclamation,
    fillColorName: 'yellow',
  },
  error: {
    icon: Failure,
    fillColorName: 'red',
  },
} as const;
