/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Form, Modal } from '@kubed/components';

export const StyledModal = styled(Modal)`
  .kubed-modal-body {
    position: relative;
    padding-bottom: 60px;
    min-height: 300px;
  }
`;

export const PlacementConfirm = styled.div`
  & > div {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 20px;
    width: auto;
    border-radius: 4px;
    margin: 0;
  }
`;

export const StyledForm = styled(Form)`
  padding: 20px;

  .form-item {
    .input-wrapper,
    .kubed-select {
      width: 100%;
      max-width: 455px;
    }
  }
`;
