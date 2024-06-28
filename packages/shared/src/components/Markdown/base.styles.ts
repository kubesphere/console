import { css } from 'styled-components';

export const baseStyles = css`
  ul,
  ol {
    list-style: inherit;
    color: inherit;
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
