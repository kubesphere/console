/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { CSSProperties } from 'react';
import type { Options as ReactMarkdownProps } from 'react-markdown';

export type MarkdownThemeName = 'global-styles' | 'github-light';

export interface MarkdownProps extends ReactMarkdownProps {
  isSupportGFM?: boolean;
  themeName?: MarkdownThemeName;
  classNames?: {
    root?: string;
    markdown?: string;
  };
  styles?: {
    root?: CSSProperties;
  };
}
