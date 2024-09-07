/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button, themeUtils } from '@kubed/components';
import { Success, Close } from '@kubed/icons';

const { getColor } = themeUtils;

export const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
`;

const StyledBaseButton = styled(Button)`
  height: 32px;
  padding: 6px 12px;
  border-radius: 16px;
  border-width: 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 600;

  & > div {
    line-height: inherit;

    & > span:not(:only-child) {
      &:first-child {
        margin-right: 4px;
      }

      &:last-child {
        margin-left: 4px;
      }
    }

    svg.kubed-icon {
      width: 16px;
      height: 16px;
    }
  }
`;

export const StyledInProgressButton = styled(StyledBaseButton)`
  background-color: ${({ theme }) => theme.palette.accents_8} !important;
  color: #fff;
`;

export const StyledUninstallingButton = styled(StyledBaseButton)`
  background-color: ${({ theme }) => getColor('red', theme)};
  color: #fff;
`;

export const StyledSettledButton = styled(StyledBaseButton)`
  background-color: ${props => props.theme.palette.accents_0};
  color: ${props => props.theme.palette.accents_8};
`;

export const StyledUninstallButton = styled(StyledBaseButton)`
  display: none;
  background-color: ${({ theme }) => getColor('red', theme)} !important;
  color: #fff;
`;

export const UninstallButtonsWrapper = styled.div`
  display: inline-block;

  &:hover {
    ${StyledSettledButton} {
      display: none;
    }

    ${StyledUninstallButton} {
      display: inline-block;
    }
  }
`;

export const StyledInstallButton = styled(StyledBaseButton)`
  background-color: ${props => props.theme.palette.accents_0};
  color: ${props => props.theme.palette.accents_8};

  &:not([disabled]):hover {
    background-color: ${({ theme }) => theme.palette.accents_8};
    color: #fff;
  }
`;

export const InstalledIcon = styled(Success)`
  fill: ${({ theme }) => getColor('green', theme)};
  color: #fff;
`;

export const FailedIcon = styled(Close)`
  border-radius: 50%;
  background-color: ${({ theme }) => getColor('red', theme)};
`;
