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

export const Card = styled.div<{ $hasTop?: boolean }>`
  padding: 12px;
  background: #f9fbfd;
  border-radius: 4px;
  margin-top: ${({ $hasTop }) => ($hasTop ? '12px' : '0')};
  & .form-item .input-wrapper,
  & .form-item .kubed-select {
    max-width: unset;
  }
`;

export const CardTitle = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #242e42;
`;

export const CardWithBorder = styled.div`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccd3db;
  background-color: #fff;
  margin-top: 8px;
`;

export const SliderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  gap: 20px;
  & > :last-child {
    margin-top: 18px;
  }
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
`;

export const CheckboxField = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 12px;
  margin-bottom: 12px;

  & > :first-child {
    margin-top: 4px;
  }
`;
