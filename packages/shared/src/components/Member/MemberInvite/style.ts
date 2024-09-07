/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Modal } from '@kubed/components';
import styled from 'styled-components';

export const ModalWithoutHeader = styled(Modal)`
  .kubed-modal-header {
    display: none;
  }
  .kubed-modal-close {
    display: none;
  }
`;

export const ModalWrapper = styled.div`
  padding: 40px 40px 20px 40px;
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

export const ModalTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  color: #242e42;
  line-height: 1.4;
  text-shadow: 0 4px 8px rgba(36, 46, 66, 0.1);
`;

export const ModalDesc = styled.p`
  margin-top: 12px;
  color: #5f708a;
`;

export const ModalContent = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #f9fbfd;
`;

export const ResultsWrapper = styled.div`
  height: calc(100vh - 400px);
  margin-top: 12px;
  padding: 12px 0;
  border-radius: 4px;
  background-color: #fff;
  border: solid 1px ${({ theme }) => theme.palette.colors.white[2]};

  .ks-InfiniteScroll-container {
    padding: 0 12px;
  }
`;

export const UserWrapper = styled.div`
  position: relative;
  padding: 8px 20px;
  border-radius: 2px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.palette.colors.white[0]};

  &:nth-child(1) {
    margin-top: 0;
  }

  & > button {
    right: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.palette.accents_5};
  }

  strong {
    color: ${({ theme }) => theme.palette.colors.dark[3]};
  }
`;

export const MenuWrapper = styled.div`
  max-height: 360px;
  overflow: auto;
  & > p {
    padding: 12px 20px 0 20px;
    font-weight: 600;
  }
  .item-inner {
    height: auto;
  }
`;
