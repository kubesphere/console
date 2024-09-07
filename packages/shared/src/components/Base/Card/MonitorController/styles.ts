/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button, Card, Modal } from '@kubed/components';

export const IconButton = styled(Button)`
  padding: 5px 10px;
  margin-left: 12px;
  border-radius: 4px;
  box-shadow: none;
  border: 1px solid #242e42;
  background-color: #242e42;
  &:hover {
    border: 1px solid #242e42;
    background-color: #242e42;
  }
`;

export const OperationsWrapper = styled.div`
  position: relative;
  display: flex;
  .button {
    padding: 5px 10px;
    margin-left: 12px;
    border-radius: 4px;
    box-shadow: none;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > span {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.43;
  }
`;
export const Content = styled.div`
  position: relative;
  margin-top: 8px;
  min-height: 100px;
  flex: 1;
  z-index: 1;
`;
export const CardWrapper = styled(Card)`
  &.showDropDown {
    z-index: 99;
  }
`;
export const EmptyWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #abb4be;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  background-color: #f9fbfd;
  border-radius: 4px;
`;

export const StyledModal = styled(Modal)`
  position: relative;
  margin: 0;
  height: calc(100vh - 40px);
  .kubed-modal-close {
    display: none;
  }
  .kubed-modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .kubed-modal-header {
      padding: 0;
    }
    .kubed-modal-body {
      padding: 20px;
      flex: 1;
      overflow-y: auto;
    }
  }
`;

export const ControllerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  border-radius: 4px;
  background-color: #eff4f9;
`;

export const ControllerTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.71;
  .kubed-icon {
    margin-right: 12px;
  }
`;

export const ControllerButton = styled(Button)`
  padding: 6px;
  margin-left: 12px;
  line-height: 20px;
  border: none;
  border-radius: 4px;
  background-color: #242e42;

  &:hover {
    background-color: #242e42 !important;
  }
`;

export const ControllerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  overflow: auto;
`;
