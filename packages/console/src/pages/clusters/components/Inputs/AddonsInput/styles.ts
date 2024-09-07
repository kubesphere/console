/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const TextWrapper = styled.div`
  flex: none;
  height: 32px;
  padding: 6px 10px;
  font-size: ${props => props.theme.font.fontSizeBase};
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  line-height: 1.67;
  color: ${props => props.theme.palette.accents_8};
  border: 1px solid ${props => props.theme.palette.accents_4};
  background-color: #eff4f9 !important;

  &:nth-of-type(1) {
    border-radius: 4px 0 0 4px;
    margin-right: -1px;
  }

  &:nth-of-type(2) {
    border-left: none;
    border-radius: 0 4px 4px 0;
  }
`;
