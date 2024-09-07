/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const commonFont = css`
  font-family: 'PingFang SC';
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const commonColor = '#79879c';
const hoverBoxShadow = '0px 4px 8px 0px rgba(36, 46, 66, 0.2)';
const commonBorder = '1px solid #e3e9ef';
const commonPadding = '12px 20px 20px';

export const Wrapper = styled.div<{ overHidden?: boolean }>`
  display: grid;
  padding: ${commonPadding};
  grid-template-columns: repeat(auto-fill, minmax(254px, 1fr));
  gap: 12px;
  ${({ overHidden }) =>
    overHidden &&
    css`
      overflow: hidden;
      max-height: 240px;
    `}
`;

export const H4 = styled.div`
  ${commonFont}
  color: #242e42;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  padding: 16px 20px 0;
`;

export const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
`;

export const Title = styled.span`
  overflow: hidden;
  color: #242e42;
  ${commonFont}
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Desc = styled.div`
  ${commonFont}
  color: ${commonColor};
`;

export const Item = styled(Link)<{ $isDragging?: boolean; $isDragOver?: boolean }>`
  border: ${commonBorder};
  display: block;
  border-radius: 4px;
  background-color: #fff;
  padding: 12px 16px;
  max-width: 333px;
  &:hover {
    box-shadow: ${hoverBoxShadow};
    border: 1px solid ${commonColor};
  }
  ${({ $isDragOver }) =>
    $isDragOver
      ? css`
          cursor: move;
        `
      : css`
          &:hover {
            ${Title} {
              color: #55bc8a;
            }
          }
        `}
  ${({ $isDragging }) =>
    $isDragging &&
    css`
      opacity: 0.5;
      border: 1.5px dashed #3270ce;
      background: rgba(50, 112, 206, 0.1);
    `}
`;

export const Footer = styled.div`
  padding: 12px;
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  cursor: pointer;
  color: #36435c;
  ${commonFont}
  font-weight: 600;
  box-shadow: 0px 1px 0px 0px #e3e9ef inset;
`;

export const Icon = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  position: relative;
`;

export const FedIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 100%;
`;

export const Empty = styled.div`
  padding: 12px 20px;
  & > div {
    padding: 12px;
    border-radius: 3px;
    border: 1px dashed #ccd3db;
    background-color: #fff;
  }
`;

export const EmptyText = Desc;
