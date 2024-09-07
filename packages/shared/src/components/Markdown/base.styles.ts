/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { css } from 'styled-components';

export const baseStyles = css`
  ul,
  ol {
    color: inherit;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  code {
    color: inherit;

    &::before,
    &::after {
      content: none;
    }
  }

  blockquote {
    border-width: 0;
    background-color: transparent;
  }
`;
