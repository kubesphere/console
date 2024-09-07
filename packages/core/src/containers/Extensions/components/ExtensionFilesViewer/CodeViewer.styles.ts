/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button } from '@kubed/components';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.accents_2};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  height: 48px;
  padding: 0 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-bottom: 1px solid ${({ theme }) => theme.palette.accents_2};
`;

export const TitleWrapper = styled.div`
  overflow-x: hidden;
  display: flex;
  column-gap: 8px;
  flex: 1;
`;

export const Title = styled.h6`
  flex: 1;
  overflow: hidden;
  color: ${({ theme }) => theme.palette.accents_7};
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
`;

export const HeaderButtons = styled.div`
  display: flex;
  column-gap: 12px;
`;

export const HeaderButton = styled(Button).attrs({ variant: 'text' })`
  width: auto;
  height: auto;
  padding: 4px;

  &:hover {
    opacity: 0.7;
    background-color: transparent;
  }

  .kubed-icon {
    width: 20px;
    height: 20px;
  }
`;

export const Content = styled.div`
  overflow: hidden auto;
  flex: 1;
`;
