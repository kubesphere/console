/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Modal } from '@kubed/components';
import styled, { css } from 'styled-components';

export const ModalStyle = styled(Modal)`
  position: relative;
  margin: 0;
  .kubed-modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .kubed-modal-body {
      padding: 20px;
      flex: 1;
    }
  }
`;

export const FormItemError = styled.div`
  margin-top: 4px;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #404e68;
  color: #ca2621;
`;

export const inputWithError = css<{ $error?: Boolean }>`
  ${({ $error }) =>
    $error &&
    css`
      border-color: #ca2621 !important;
      box-shadow: none !important;
    `}
`;
