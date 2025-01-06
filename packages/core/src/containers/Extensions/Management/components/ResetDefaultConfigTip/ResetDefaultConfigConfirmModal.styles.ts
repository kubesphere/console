/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Modal } from '@kubed/components';

export const StyledModal = styled(Modal)`
  .kubed-modal-body {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    padding: 20px;
  }

  .kubed-modal-footer {
    padding-top: 14px;
    padding-bottom: 14px;
    background-color: ${({ theme }) => theme.palette.colors.white[0]};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;

  svg.kubed-icon {
    color: rgba(255, 255, 255, 0.9);
    fill: ${({ theme }) => theme.palette.colors.blue[2]};
  }
`;

export const Title = styled.h5`
  margin: 0;
  color: ${({ theme }) => theme.palette.colors.accents_8};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`;

export const Description = styled.p`
  margin: 0;
  color: #404f68;
  font-size: 12px;
  line-height: 20px;
`;
