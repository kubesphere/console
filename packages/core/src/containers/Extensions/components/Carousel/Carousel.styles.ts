/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Slides = styled.div`
  position: relative;
  padding: 0 44px;

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .arrow-left {
    left: 0;
  }

  .arrow-right {
    right: 0;
  }
`;

export const Viewport = styled.div`
  overflow: hidden;
`;

export const Container = styled.div`
  display: flex;
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
`;

export const Dots = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 8px;
  padding-top: 12px;
`;

export const Dot = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  max-width: 24px;
  width: 24px;
  min-width: 12px;
  height: 12px;
  cursor: pointer;

  &::after {
    content: ' ';
    width: 100%;
    height: 2px;
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.palette.colors.green[2] : '#d8dee5'};
  }
`;
