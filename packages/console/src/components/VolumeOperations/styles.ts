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

export const Card = styled.div`
  min-height: 64px;
  border: 1px solid #ccd3db;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 12px;
  margin-top: 12px;
  display: grid;
  gap: 8px;
  grid-template-columns: auto 1fr;
  align-items: start;
`;
