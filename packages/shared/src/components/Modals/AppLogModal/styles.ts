import styled from 'styled-components';
import { Empty, Modal } from '@kubed/components';

export const StyledModal = styled(Modal)`
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
  }
`;

export const EmptyWrapper = styled(Empty)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 61px);
  position: absolute;

  .empty-title {
    margin-top: 30px;
  }
`;
