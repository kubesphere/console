/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Alert } from '@kubed/components';
import styled, { css } from 'styled-components';

interface IItem {
  selected: boolean;
}

export const Body = styled.div`
  padding: 12px;
  color: #242e42;
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 8px;
`;

export const Workloads = styled.div`
  margin-top: 8px;
  height: 188px;
  padding: 6px 0;
  border: 1px solid ${({ theme }) => theme.palette.accents_3};
  border-radius: ${({ theme }) => theme.layout.radius.sm};
`;

export const Item = styled.div<IItem>`
  position: relative;
  height: 32px;
  padding: 6px 12px 6px 36px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
  }

  .ring {
    display: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.palette.accents_3};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 14px;
    transition: all 0.3s ease-in-out;
  }

  .name {
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.font.fontSizeBase};
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: ${({ theme }) => theme.palette.accents_8};
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.accents_0};

    svg {
      display: none;
    }

    .ring {
      display: block;
    }
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.palette.accents_0};

      svg {
        display: none;
      }

      .ring {
        display: block;
        border: 3px solid ${({ theme }) => theme.palette.colors.green[2]};
        box-shadow: 0 4px 8px rgba(85, 188, 138, 0.2);
      }
    `}
`;

export const Footer = styled.div`
  height: 44px;
  padding: 6px 12px;
  border-bottom-left-radius: ${({ theme }) => theme.layout.radius.sm};
  border-bottom-right-radius: ${({ theme }) => theme.layout.radius.sm};
  border-top: 1px solid ${({ theme }) => theme.palette.accents_3};
  background-color: ${({ theme }) => theme.palette.accents_1};
  text-align: right;

  button {
    &:last-of-type {
      margin-left: 12px;
    }
  }
`;
