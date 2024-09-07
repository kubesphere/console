/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const FormGroup = styled.div`
  margin: 12px 0px;
  padding: 11px 16px;
  border-radius: 4px;
  border: solid 1px #ccd3db;
`;

export const FormGroupTitle = styled.div`
  font-weight: 600;
  color: #36435c;
`;

export const FormGroupDesc = styled.div`
  font-family: ${props => props.theme.font.sans};
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #79879c;
`;

export const GroupContent = styled.div`
  padding: 12px;
  margin-top: 12px;

  & > div {
    margin-bottom: 12px;
  }
`;
