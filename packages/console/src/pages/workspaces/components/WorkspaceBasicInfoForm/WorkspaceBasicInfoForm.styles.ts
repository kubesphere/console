/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Form } from '@kubed/components';

export const StyledForm = styled(Form)`
  padding: 20px;

  .form-item {
    .input-wrapper,
    .kubed-select {
      width: 100%;
      max-width: 455px;
    }
    .kubed-select-disabled {
      cursor: not-allowed;
      .kubed-select-selector {
        background-color: #eff4f9;
        border-color: #abb4be;
      }
    }
  }
`;
