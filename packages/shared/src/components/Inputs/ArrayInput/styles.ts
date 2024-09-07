/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Button } from '@kubed/components';
import styled from 'styled-components';

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

export const StyledDesc = styled.div`
  color: ${props => props.theme.palette.accents_5};
`;

export const StyledItem = styled.div`
  position: relative;
  padding: 6px 68px 6px 17px;
  border-radius: 60px;
  background-color: ${props => props.theme.palette.accents_1};
  border: solid 1px ${props => props.theme.palette.accents_3};

  &:not(:first-of-type) {
    margin-top: 4px;
  }

  & > input {
    max-width: none !important;
  }
`;

export const DeleteButton = styled(Button)`
  right: 6px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const ErrorTip = styled.div`
  padding: 3px 68px 3px 17px;
  margin-top: 4px;
  font-family: ${props => props.theme.font.sans};
  font-size: 12px;
  line-height: 1.67;
  letter-spacing: normal;
  //color: $red-color03;
`;
