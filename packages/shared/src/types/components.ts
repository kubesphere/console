import type { CSSProperties } from 'react';

export interface ComponentStyles {
  styles?: {
    root?: CSSProperties;
  };
  sx?: CSSProperties;
  style?: CSSProperties;
}
