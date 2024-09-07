/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ModalBody = styled.div`
  padding: 20px;
  border-radius: 4px;
  max-height: calc(100vh - 158px);
  overflow-y: auto;
`;

export const H5 = styled.div`
  font-weight: 400;
  line-height: 2;
  color: #36435c;
  text-shadow: 0 2px 4px rgba(72, 91, 127, 0.2);
  font-size: 16px;
  & svg {
    vertical-align: middle;
  }
`;
