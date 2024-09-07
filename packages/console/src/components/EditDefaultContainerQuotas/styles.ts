/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Modal } from '@kubed/components';
import styled from 'styled-components';

export const ModalStyle = styled(Modal)`
  .kubed-modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .kubed-modal-body {
      padding: 20px;
      flex: 1;
      background: #fff;
    }
  }
`;

export const ItemWrapper = styled.div`
  padding: 12px;
  margin-top: 12px;
  border-radius: 2px;
  background-color: #f9fbfd;
  & > p {
    margin-bottom: 4px;
  }
`;
