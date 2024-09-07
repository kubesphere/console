/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Error, Substract, Success } from '@kubed/icons';

export const StatusWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusBox = styled.label`
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  border-radius: 50%;
`;

export const DraftStatus = styled(StatusBox)`
  border: 2px solid ${({ theme }) => theme.palette.accents_4};
`;

export const ReviewStatus = styled(StatusBox)`
  border: 2px solid ${({ theme }) => theme.palette.colors.green[2]};
`;

export const SuspendedStatus = styled(StatusBox)`
  background-color: ${({ theme }) => theme.palette.colors.yellow[2]};
`;

export const SuspendedStatusIcon = styled(Substract)`
  color: #ffffff;
`;

export const PassedStatus = styled(Success)`
  color: #ffffff;
  fill: ${({ theme }) => theme.palette.colors.green[2]};
`;

export const DeletedStatus = styled(Error)`
  color: #ffffff;
  fill: ${({ theme }) => theme.palette.colors.red[2]};
`;
