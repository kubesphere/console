/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled, { keyframes, css } from 'styled-components';
import { Entity } from '@kubed/components';

import { Text } from './Tools.shared.styles';

const toolsFadeIn = keyframes`
  0% {
    opacity: 0;
    padding-bottom: 0;
  }

  100% {
    opacity: 1;
    padding-bottom: 20px;
  }
`;

const toolsShowStyle = css`
  height: auto;
  overflow: unset;
  padding-bottom: 20px;
  animation: ${toolsFadeIn} 0.3s ease;
`;

export const Root = styled.div<{ $isShown: boolean }>`
  position: absolute;
  bottom: 70%;
  right: 0;
  height: 0;
  overflow: hidden;

  ${({ $isShown }) => ($isShown ? toolsShowStyle : '')}
`;

export const Wrapper = styled.div`
  overflow: hidden;
  width: 420px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
  background-color: #fff;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  padding: 12px;
  background-color: #fff;
`;

export const Group = styled.div``;

export const GroupTitle = styled(Text)`
  padding-bottom: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.accents_7};
`;

export const GroupTools = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const StyledEntity = styled(Entity)`
  cursor: pointer;

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  & > .entity-main {
    align-items: center;
  }

  .toolbox-item-content {
    overflow-x: hidden;
  }
`;
