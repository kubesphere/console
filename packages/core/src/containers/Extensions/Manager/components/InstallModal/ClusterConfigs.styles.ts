/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Entity, Button } from '@kubed/components';

export { StepContentTitle, StepContentInnerWrapper } from '../shared.styles';

export const ConfigChangedWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 8px;
`;

export const ConfigChangedText = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const ActionButtons = styled.div`
  display: none;
  align-items: center;
  gap: 4px;
  padding-right: 8px;
`;

export const ActionButton = styled(Button).attrs({ variant: 'text' })`
  width: 56px;
  height: 32px;

  svg.kubed-icon {
    width: 16px;
    height: 16px;
  }
`;

export const StyledEntity = styled(Entity)`
  cursor: default;

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }

  &:hover {
    ${ConfigChangedWrapper} {
      display: none;
    }

    ${ActionButtons} {
      display: flex;
    }
  }
`;
