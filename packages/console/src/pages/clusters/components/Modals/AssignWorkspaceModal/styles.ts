/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Modal } from '@kubed/components';
import styled from 'styled-components';

export const ModalStyle = styled(Modal)`
  position: relative;
  margin: 0;
  .kubed-modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .kubed-modal-body {
      flex: 1;
    }
  }
`;

export const Modalbody = styled.div`
  padding: 20px;
`;
