/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button } from '@kubed/components';

const ListActionButton = styled(Button)`
  min-width: 78px;
  height: 32px;
  padding: 0 12px;
  border-radius: 16px;
  border: none;
  background-color: ${({ theme }) => theme.palette.accents_0};
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;

export const DetailActionButton = styled(Button).attrs({ color: 'secondary' })`
  min-width: 120px;
  height: 32px;
  padding: 0 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;

export const ListSubscribeButton = styled(ListActionButton)`
  color: #55bc8a;
`;

export const ListManageButton = styled(ListActionButton)`
  & > div > span:first-of-type {
    margin-right: 4px;
  }
`;

export const ConfirmModalContent = styled.p`
  padding: 20px;
`;
