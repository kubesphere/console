/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button, themeUtils } from '@kubed/components';
import { Success, Close } from '@kubed/icons';

const { getColor } = themeUtils;

export const StyledBaseButton = styled(Button).attrs({
  shadow: true,
  block: true,
})`
  min-width: 120px;
  width: auto;
`;

export const StyledSettledButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 16px;
  min-width: 120px;
  width: auto;
  height: 32px;
  padding: 6px 12px;
  font-weight: 600;
  cursor: default;
`;

export const InstalledIcon = styled(Success)`
  margin-right: 4px;
  fill: ${({ theme }) => getColor('green', theme)};
  color: #fff;
`;

export const FailedIcon = styled(Close)`
  margin-right: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => getColor('red', theme)};
`;
