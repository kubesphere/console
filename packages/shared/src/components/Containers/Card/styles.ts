/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Modal } from '@kubed/components';

export const FullScreenModal = styled(Modal)`
  position: relative;
  margin: 0;
  height: calc(100vh - 40px);
  .kubed-modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .kubed-modal-body {
      padding: 0px;
      flex: 1;
    }
    .kubed-modal-footer {
      display: none;
    }
    .log-line {
      white-space: break-spaces;

      a {
        color: #b7c4d1;
        font-weight: 600;
        line-height: 20px;
        white-space: pre-wrap;
        &:hover {
          color: #55bc8a;
        }

        strong {
          color: $yellow;
        }
      }
    }
  }
`;
