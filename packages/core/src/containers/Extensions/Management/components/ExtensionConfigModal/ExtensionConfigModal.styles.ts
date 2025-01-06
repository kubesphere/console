/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Modal } from '@kubed/components';

export const StyledModal = styled(Modal)`
  .kubed-modal-body {
    position: relative;
    min-height: 300px;
    padding: 20px;

    .ace_editor {
      min-height: 484px;
    }
  }
`;
