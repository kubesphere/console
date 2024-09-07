/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Button } from '@kubed/components';
import styled from 'styled-components';

export const Selector = styled.div`
  &.active {
    .arrow {
      transform: rotate(-180deg);
    }

    .dropdown {
      visibility: visible;
      opacity: 1;
      top: calc(100% + 8px);
    }
  }

  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 10;
  }
`;

export const StyledButton = styled(Button)`
  position: relative;
  z-index: 10;
  min-width: 230px;
  padding: 6px !important;
  line-height: 20px;
  color: #fff;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.colors.dark[3]};

  &:hover {
    background-color: ${({ theme }) => theme.palette.colors.dark[3]} !important;
  }

  & > div {
    display: flex;
    justify-content: center;
    > span {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }

  p {
    width: calc(100% - 30px);
    margin-left: 6px;
    margin-right: 24px;
    text-align: left;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }

  .arrow {
    position: absolute;
    top: 8px;
    right: 6px;
    width: 16px;
    height: 16px;
    transition: all 0.3s ease;
  }
`;

export const Mask = styled.div`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 10;

  &.active {
    display: block;
  }
`;

export const Content = styled.div`
  width: 330px;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  &.custom {
    display: flex;
    width: 760px;
    & > div {
      width: 50%;
    }
  }
  .kubed-picker {
    width: 100%;
  }
  .kubed-select {
    width: 160px !important;
  }
  .form-item-wrapper {
    margin-bottom: 0;
    margin-top: 12px;
    &:first-child {
      margin-top: 0;
    }
  }
  .form-vertical {
    padding: 0;
  }
`;

export const Title = styled.div`
  margin-bottom: 8px;
  line-height: 1.67;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 160px;
  font-size: 12px;
`;

export const Item = styled.li`
  width: 33.3333%;
  font-weight: 600;
  line-height: 24px;
  margin: 4px 0;
  cursor: pointer;

  &.cur {
    color: ${({ theme }) => theme.palette.colors.green[2]};
  }

  &:hover {
    color: ${({ theme }) => theme.palette.colors.green[2]};
  }
`;

export const Actions = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;

  &.bottom10 {
    bottom: 10px !important;
  }

  button {
    width: 85px;
    padding: 5px 0;
    text-align: center;
    border-radius: 100px;
    &:first-child {
      margin-right: 12px;
    }
  }
`;
