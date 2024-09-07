/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const TextPreviewWrapper = styled.div`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.border};
`;

export const EditorWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  min-height: 500px;
  height: calc(-420px + 100vh);
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OverlayTools = styled.div`
  &:hover {
    svg {
      color: ${({ theme }) => theme.palette.colors.green[2]};
    }
  }
`;
