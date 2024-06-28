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
