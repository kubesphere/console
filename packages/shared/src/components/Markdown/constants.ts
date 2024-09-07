/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { githubLightStyles } from './github-light.styles';

export const DEFAULT_THEME = {
  className: undefined,
  styles: undefined,
};

export const THEMES = {
  'global-styles': {
    className: 'markdown-body',
    styles: undefined,
  },
  'github-light': {
    className: 'github-light-markdown-body',
    styles: githubLightStyles,
  },
};
