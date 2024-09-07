/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Input, Modal } from '@kubed/components';
import styled from 'styled-components';

export const ModalWrapper = styled(Modal)`
  .kubed-modal-close {
    display: none;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const ModalTitle = styled.div`
  color: #000;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: 'PingFang SC';
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  margin-bottom: 12px;
`;

export const UploadWrapper = styled.div`
  border-radius: 4px;
  cursor: pointer;
  border: 1px dashed #ccd3db;
  background: #fff;
  display: grid;
  grid-template:
    'icon title' auto
    'icon desc' auto / 40px 1fr;
  padding: 12px;
  column-gap: 12px;
  row-gap: 0px;

  & > div:nth-child(1) {
    grid-area: icon;
  }
  & > div:nth-child(2) {
    grid-area: title;
  }
  & > div:nth-child(3) {
    grid-area: desc;
  }
`;

export const UploadFile = styled.div`
  display: grid;
  padding: 4px 8px;
  gap: 12px;
  margin-top: 8px;
  grid-template-columns: 1fr auto;
  align-items: center;
  background-color: #f9fbfd;
  border-radius: 4px;
  & .icon-clickable {
    border-radius: 4px;
    cursor: pointer;
    pointer-events: auto;
    outline: none;
  }
  & span:nth-child(1) {
    color: #242e42;
    font-feature-settings:
      'clig' off,
      'liga' off;
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
`;

export const InputWrapper = styled(Input)`
  &.input-wrapper {
    max-width: none !important;
  }
`;
