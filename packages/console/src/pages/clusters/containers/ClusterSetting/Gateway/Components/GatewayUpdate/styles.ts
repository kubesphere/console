/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Modal } from '@kubed/components';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  .kubed-modal-header,
  .kubed-modal-close {
    display: none;
  }
  .kubed-modal-body {
    padding: 20px;
    min-width: 320px;
    color: ${({ theme }) => theme.palette.colors.dark[3]};
    background: #fff;
  }
  .kubed-modal-footer {
    padding: 8px 20px;
    background-color: ${({ theme }) => theme.palette.colors.white[1]};
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  line-height: 20px;
  margin-bottom: 8px;

  strong {
    font-size: $size-normal;
  }
  .kubed-icon {
    margin-right: 6px;
  }
`;

export const Content = styled.div`
  line-height: 1.67;
`;
