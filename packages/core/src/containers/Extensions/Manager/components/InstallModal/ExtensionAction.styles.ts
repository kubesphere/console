/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { themeUtils } from '@kubed/components';
import { Forward, Success, Close } from '@kubed/icons';

export { StepContentInnerWrapper } from '../shared.styles';

const { getColor } = themeUtils;

export const ActionInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 4px;
  background-color: #fff;
  padding: 20px 12px;
`;

export const ActionIcons = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
`;

export const ExtensionIcon = styled.img`
  width: 40px;
`;

export const ActionIcon = styled(Forward)`
  margin: 0 12px;
`;

export const ActionTitle = styled.h5`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: inherit;
`;

export const ActionDescription = styled.p`
  margin: 3px 0 20px;
  color: ${({ theme }) => theme.palette.accents_5};
  line-height: inherit;
  text-align: center;
`;

export const ActionSettled = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 16px;
  height: 32px;
  padding: 6px 12px;
  font-weight: 600;
`;

export const ActionSucceedIcon = styled(Success)`
  margin-right: 5px;
  fill: ${({ theme }) => getColor('green', theme)};
  color: #fff;
`;

export const ActionFailedIcon = styled(Close)`
  margin-right: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => getColor('red', theme)};
`;

export const LogViewerWrapper = styled.div`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_1};
  margin-top: 20px;
  a {
    color: #0070f3;
  }
`;

export const ExtensionConfigBox = styled(ActionInfoBox)`
  display: block;
  padding: 12px;
  margin-top: 10px;

  .kubed-collapse-header {
    align-items: flex-start;
  }
`;

export const CollapsePanelHeaderTitle = styled.h6`
  margin: 0;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const CollapsePanelHeaderDescription = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const EditorWrapper = styled.div`
  padding: 12px;
  margin-top: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};

  .ace_editor {
    min-height: 300px;
  }
`;
