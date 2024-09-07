/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Tabs, Button, Row, Modal } from '@kubed/components';
import { PageMain } from '../AppsDashBoard/styles';

export const DeployPageMain = styled(PageMain)``;

export const AppInfoWrapper = styled(DeployPageMain)`
  position: relative;
  padding: 0;
  height: auto;
  min-height: calc(100vh - 220px);
`;

export const TabsWrapper = styled.div`
  background-color: #eff4f9;

  @media (max-width: 768px) {
    > div {
      width: 1024px;
    }
  }

  @media (min-width: 1164px) {
    > div {
      width: 1258px;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export const StyledTabs = styled(Tabs)`
  div:nth-child(2) {
    padding-top: 0;
  }

  .tab-group {
    background-color: ${({ theme }) => theme.palette.accents_1};

    .tab-item {
      padding: 0;
      margin-right: 0;
      margin-left: 0;
    }

    .tab-label {
      font-size: 12px;
      font-weight: 600;
      padding: 2px 0;
      min-width: 120px;
    }
  }

  .tab-item__active {
    border: none;
  }

  .tab-item__active .tab-label {
    color: ${({ theme }) => theme.palette.colors.green[2]};
  }
`;

export const DeployButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 42px;
  z-index: 20;
`;

export const StyledRow = styled(Row)`
  padding: 22px 20px 32px;
  flex-wrap: nowrap;
  width: 100%;
`;

export const NoHeaderModal = styled(Modal)`
  .kubed-modal-close,
  .kubed-modal-header {
    display: none;
  }
`;

export const AgreeMentWrapper = styled.div`
  display: flex;
  padding: 20px 20px 0;

  .content {
    padding-top: 18px;

    ul {
      list-style: disc;
      margin-top: 8px;
      margin-left: 20px;
      margin-bottom: 12px;
    }

    :global {
      label.checkbox input[type='checkbox'],
      label.checkbox:before {
        width: 12px;
        height: 12px;
      }
    }
  }

  .title {
    font-weight: 600;
    font-size: 14px;
  }
`;
