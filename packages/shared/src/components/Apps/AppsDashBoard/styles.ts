/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import Icon from '../../Icon';
import { Group, Input } from '@kubed/components';

const Box = styled.div`
  width: 100vw;
  padding: 0 24px;

  @media (max-width: 768px) {
    width: 1024px;
  }

  @media (min-width: 1164px) {
    width: 1258px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const PageMain = styled(Box)`
  display: flex;
  gap: 20px;
  padding-top: 24px;
  height: calc(100vh - 276px);

  .app-list {
    flex: 1;
    padding: 0 0 20px 0;
  }
`;

export const ToolBarWrapper = styled.div`
  background: ${({ theme }) => theme.palette.accents_0};
`;

export const ToolBarContent = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
`;

export const CountDesc = styled.div`
  line-height: 1.67;
  font-weight: bold;
  margin-left: 213px;
  color: ${({ theme }) => theme.palette.accents_7};
`;

export const SearchInput = styled(Input)`
  z-index: 11;
  width: 400px;
  border-radius: 18px;
  border-color: transparent;
  background-color: ${({ theme }) => theme.palette.accents_1};

  input {
    padding-left: 4px;
  }
`;

export const CategoriesWrapper = styled.div`
  min-width: 193px;
  max-width: 193px;
`;

export const StyledGroup = styled(Group)`
  margin: 12px 0 28px 12px;
  gap: 12px;
`;

export const Title = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  color: ${({ theme }) => theme.palette.accents_7};
  font-weight: bold;
`;

export const MenuItem = styled.div`
  line-height: 20px;
  font-size: 12px;
  list-style: none;
  color: ${({ theme }) => theme.palette.accents_8};
  cursor: pointer;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.palette.colors.green[2]};

    svg {
      color: #00aa72;
      fill: #90e0c5;
    }
  }

  &.active {
    font-weight: 500;
  }
`;

export const Name = styled.span`
  display: inline-block;
  margin-left: 12px;
`;

export const StyledIcon = styled(Icon)`
  vertical-align: middle;
` as any;
