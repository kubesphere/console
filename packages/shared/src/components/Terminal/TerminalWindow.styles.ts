/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Modal, themeUtils } from '@kubed/components';

export const PADDING = 40;

const HEADER_HEIGHT = 60;

export const StyledModal = styled(Modal)`
  .kubed-modal-header {
    border-bottom-width: 0;
  }

  .kubed-modal-body {
    overflow-y: auto;
    height: calc(100vh - ${PADDING + HEADER_HEIGHT}px);
    max-height: calc(100vh - 30px);
    padding: 12px;
  }
`;

const { getColor } = themeUtils;

const TIPS_HEIGHT = 32;

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const HelpDoc = styled.div`
  position: relative;
  width: 320px;
  margin-left: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const Doc = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-bottom: ${TIPS_HEIGHT}px;
`;

export const HideHelpDocButton = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${TIPS_HEIGHT}px;
  padding-left: 12px;
  padding-right: 12px;
  line-height: ${TIPS_HEIGHT}px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_1};
  color: ${({ theme }) => getColor('blue', theme)};
  cursor: pointer;
`;

export const ShowHelpDocButton = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_1};
  text-align: center;
  line-height: 32px;
  cursor: pointer;
`;
