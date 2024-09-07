/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Banner, Button } from '@kubed/components';

export const Header = styled(Banner)`
  .banner-title {
    padding: 48px 20px;
    background-color: ${({ theme }) => theme.palette.accents_1};

    & > div:first-child {
      margin-top: 0;
      background-color: transparent;
      padding: 0;
      width: unset;
      height: unset;
    }

    svg {
      display: block;
    }

    h3 {
      margin-top: 5px;
      font-size: 12px;
      line-height: 20px;
    }
  }

  .banner-extra {
    border-top: 1px solid ${({ theme }) => theme.palette.border};
    border-bottom: 1px solid ${({ theme }) => theme.palette.border};
    & > div {
      background-color: ${({ theme }) => theme.palette.accents_0};
    }
  }
`;

export const CloseModal = styled(Button)`
  position: absolute;
  top: 52px;
  right: 20px;
  z-index: 10;
  padding: 4px;
  border-radius: 4px;
`;

export const Content = styled.div`
  padding: 20px;
  height: calc(100vh - 266px);
  overflow-y: auto;

  pre {
    padding: 0;
    border: none;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow: auto;
    font-family:
      PT Mono,
      Monaco,
      Menlo,
      Consolas,
      Courier New,
      monospace;
  }
`;

export const Footer = styled.div`
  background-color: ${({ theme }) => theme.palette.accents_0};
  padding: 20px;
  text-align: right;
`;

export const StyledButton = styled(Button)`
  min-width: 96px;
`;
