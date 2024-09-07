/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Modal } from '@kubed/components';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  .steps-content {
    min-height: 476px;
    max-height: calc(100vh - 222px);
    padding: 20px;
    overflow-y: auto;
  }
`;

export const Note = styled.p`
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const FirstStepText = styled.div`
  margin: 12px;
  line-height: 24px;
`;

export const LearnMore = styled.span`
  a {
    color: ${({ theme }) => theme.palette.colors.blue[2]};
  }
`;

export const TextArea = styled.textarea`
  padding: 6px 12px;
  width: 100%;
  height: 200px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.accents_4};
  font-weight: 600;
  color: ${({ theme }) => theme.palette.accents_7};
`;
