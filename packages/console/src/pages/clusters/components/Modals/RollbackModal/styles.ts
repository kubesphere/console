import styled from 'styled-components';
import { Modal } from '@kubed/components';

const StyledModal = styled(Modal)`
  .kubed-modal-body {
    padding: 20px;

    & > div {
      bottom: 24px;
    }
  }
`;

export { StyledModal };
