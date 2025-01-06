/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { Return } from '@kubed/icons';

export const Root = styled.div<{ $height: number }>`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  height: ${({ $height }) => $height}px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
`;

export const BackButton = styled(Return).attrs({ size: 20 })`
  cursor: pointer;

  &:hover {
    color: #00aa72;
    fill: #90e0c5;
  }
`;

export const Title = styled.h5`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const Content = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 4px;
`;

export const SubHeader = styled(Header)`
  padding-bottom: 8px;
`;

export const SubTitle = styled(Title)`
  font-size: 12px;
`;

export const ActionConfirmWrapper = styled.div`
  position: relative;
  height: 88px;
  /* margin: 0 -20px -20px; */

  & > div {
    margin: 0;
  }
`;
