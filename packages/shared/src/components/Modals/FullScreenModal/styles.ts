/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Modal } from '@kubed/components';

export const PADDING = 20;

const HEADER_HEIGHT = 61;

const FOOTER_HEIGHT = 64;

export const StyledModal = styled(Modal)`
  .kubed-modal-body {
    height: ${({ header, footer }) =>
      `calc(100vh - ${
        PADDING * 2 + (header === null ? 0 : HEADER_HEIGHT) + (footer === null ? 0 : FOOTER_HEIGHT)
      }px)`};
    max-height: calc(100vh - 30px);
  }
`;
