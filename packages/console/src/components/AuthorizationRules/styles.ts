/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ModalContent = styled.div`
  padding: 20px;
  max-height: calc(100vh - 158px);
  overflow-y: auto;
`;

// cn 授权规则 en Authorization Rules
export const AuthRoleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 12px 0;
`;

export const FormContainer = styled.div`
  background: #f9fbfd;
  border-radius: 4px;
  padding: 12px;
`;

export const FormItemWrapper = styled.div`
  background: #eff4f9;
  border: 1px solid #ccd3db;
  border-radius: 22px;
  padding: 6px 20px;
  height: 44px;
  display: grid;
  gap: 12px;
  grid-template-columns: 152px 112px 1fr;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;
