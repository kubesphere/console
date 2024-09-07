/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Field, Modal } from '@kubed/components';

export const StyledModal = styled(Modal)`
  .kubed-modal-close {
    display: none;
  }

  .kubed-modal-body {
    padding: 20px;
  }

  .name {
    .field-value {
      font-size: 16px;
      line-height: 32px;
    }
  }
`;

export const StyledField = styled(Field)`
  margin-bottom: 20px;
`;
