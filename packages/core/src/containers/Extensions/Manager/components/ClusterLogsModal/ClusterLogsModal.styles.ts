/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Modal, Tabs } from '@kubed/components';

import { StepContentInnerWrapper } from '../shared.styles';
import { Block, Title } from './shared.styles';

export const StyledModal = styled(Modal)`
  .kubed-modal-body {
    padding: 20px;
  }
`;

export const Wrapper = styled(StepContentInnerWrapper)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Overview = styled(Block)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
`;

export const ProgressTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProgressText = styled(Title)``;

// Tabs

export const StyledTabs = styled(Tabs)`
  height: 660px;

  & > div[direction='vertical']:first-of-type {
    align-items: flex-start;
    border-right: 0;

    .tab-group {
      display: block;
      overflow-y: auto;
      max-height: 100%;
      margin-right: 0;

      .tab-item {
        width: 300px;
        padding: 12px;
        border-width: 0;
        border-radius: 4px;
        background-color: #fff;

        &:not(:last-of-type) {
          margin-bottom: 8px;
        }

        &.tab-item__active {
          background-color: ${({ theme }) => theme.palette.accents_8};
        }
      }
    }
  }

  & > div[direction='vertical']:last-of-type {
    overflow-x: hidden;
    flex: 1;
    padding-left: 12px;
  }
`;
