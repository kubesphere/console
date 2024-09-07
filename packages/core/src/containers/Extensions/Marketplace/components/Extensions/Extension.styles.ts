/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { STYLES } from './constants';

const DESCRIPTION_LINE_HEIGHT = 20;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc((100% - ${STYLES.extensionGap * 3}px) / 4);
  height: 278px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(36, 46, 66, 0.06);
  border-radius: 4px;
  border: 1px solid transparent;
  background-color: #fff;
  transition: all ease-in-out 0.3s;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.palette.accents_5};
    box-shadow: 0 4px 8px 0 rgb(36 46 66 / 20%);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
`;

export const Icon = styled.img`
  max-width: 100%;
  height: auto;
`;

export const NameWrapper = styled.div`
  width: 100%;
  padding-top: 12px;

  a {
    max-width: 100%;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
`;

export const ProviderWrapper = styled.div`
  height: 20px;
`;

export const Provider = styled.span`
  display: inline-block;
  max-width: 100%;
  color: ${({ theme }) => theme.palette.accents_5};
  line-height: 20px;
  font-size: 12px;
  cursor: default;

  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;

export const DescriptionWrapper = styled.div`
  overflow: hidden;
  flex: 1;
  padding: 12px 0;
`;

export const Description = styled.p<{ $height: number }>`
  height: 100%;
  margin: 0;
  line-height: ${DESCRIPTION_LINE_HEIGHT}px;
  font-size: 12px;
  cursor: default;

  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${({ $height }) => Math.floor($height / DESCRIPTION_LINE_HEIGHT)};
  -webkit-box-orient: vertical;
`;
