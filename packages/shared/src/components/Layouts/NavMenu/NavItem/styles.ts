/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ItemWrapper = styled.li`
  transition: all 0.2s ease-in-out;
  margin-bottom: 5px;

  &.is-open {
    .inner-nav {
      margin: 5px 0;
    }

    .inner-item {
      height: 20px;
      opacity: 1;
      transition:
        height 0.2s ease-in-out,
        margin-top 0.2s ease-in-out,
        opacity 0.2s ease-in-out 0.1s;

      &:not(:first-child) {
        margin-top: 8px;
      }
    }

    .open-indicator {
      transform: rotate(-180deg);
    }
  }

  &.is-select {
    color: #55bc8a;

    .title-wrapper,
    .item-link {
      color: #55bc8a;
    }

    .kubed-icon.item-icon {
      color: #00aa72;
      fill: #90e0c5;
    }
  }

  &.is-disabled {
    .title-wrapper,
    .item-link {
      opacity: 0.7;
      padding-right: 0;
      cursor: not-allowed;
    }
  }

  .item-link {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 20px;
    padding: 8px 12px;
    font-weight: 500;
    cursor: pointer;
    color: #4a5974;

    .kubed-icon.item-icon {
      margin-right: 12px;
      margin-top: -1px;
    }
  }
`;

export const LicenseErrorTipWrapper = styled.div`
  display: flex;
  justify-content: end;
  flex: 1;
`;

export const TitleWrapper = styled.div`
  position: relative;
  /* display: block; */
  display: flex;
  align-items: center;
  line-height: 20px;
  padding: 8px 12px;
  font-weight: 500;
  cursor: pointer;
  color: #4a5974;

  .open-indicator {
    position: absolute;
    right: 0;
    top: 12px;
    transition: all 0.2s ease-in-out;
  }

  .kubed-icon.item-icon {
    margin-right: 12px;
    /* margin-top: -1px; */
    /* vertical-align: middle; */
  }
`;

export const InnerNav = styled.ul`
  position: relative;
  padding-left: 38px;
  transition: all 0.2s ease-in-out;
`;

export const InnerItem = styled.li`
  display: flex;
  align-items: center;
  transition:
    height 0.2s ease-in-out 0.1s,
    margin-top 0.2s ease-in-out 0.1s,
    opacity 0.2s ease-in-out;
  overflow: hidden;
  opacity: 0;
  height: 0;

  a {
    display: block;
  }

  &.is-select {
    a {
      color: #55bc8a;
    }
  }

  &&.is-disabled {
    opacity: 0.7;

    span {
      color: #4a5974;
      cursor: not-allowed;
    }
  }
`;

export const ImageIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 8px;
  vertical-align: text-bottom;
`;
