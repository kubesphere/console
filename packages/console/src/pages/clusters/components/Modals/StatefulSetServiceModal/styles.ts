/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Tag } from '@kubed/components';

const FormWrapper = styled.div`
  padding: 20px;
`;

const StyledLoading = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTag = styled(Tag)`
  margin: 6px 4px;
`;

const FormGroup = styled.div`
  margin: 12px 0px;
  padding: 11px 16px;
  border-radius: 4px;
  border: solid 1px #ccd3db;
`;

const FormGroupTitle = styled.div`
  font-weight: 600;
  color: #36435c;
`;

const FormGroupDesc = styled.div`
  font-family: ${props => props.theme.font.sans};
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #79879c;
`;

const GroupContent = styled.div`
  padding: 12px;
  margin-top: 12px;

  & > div {
    margin-bottom: 12px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px;
  background-color: #eff4f9;

  & > button:last-of-type {
    margin-left: 12px;
  }
`;

export {
  FormWrapper,
  StyledLoading,
  StyledTag,
  FormGroup,
  FormGroupTitle,
  FormGroupDesc,
  GroupContent,
  ButtonWrapper,
};
