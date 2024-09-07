/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import StatusIndicator from '../StatusIndicator';

export const IndicatorWrapper = styled(StatusIndicator)`
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 8px;
  height: 8px;
`;

export const ListItem = styled.div`
  position: relative;
  padding: 11px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: white;
  border: solid 1px #ccd3db;
  transition: all 0.3s ease-in-out;

  &:last-child {
    margin-bottom: 0;
  }

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &:hover {
    border-color: #79879c;
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);

    .buttons {
      display: block;
    }
  }

  .buttons {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 32px;
    padding: 0px 4px;
    border-radius: 4px;
    background-color: #fff;

    & > button {
      width: 56px;
      margin-left: 4px;
    }
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  margin-right: 12px;
  & > img {
    width: 40px;
    height: 40px;
  }
`;

export const TextsDiv = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
  .text {
    min-width: 160px;
    padding-right: 20px;

    &:first-of-type {
      min-width: 200px;
    }

    .title {
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      overflow: hidden;

      font-size: 12px;
      line-height: 1.67;

      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      font-weight: bold;
      color: #242e42;
    }

    .description {
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      overflow: hidden;

      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.67;
      letter-spacing: normal;
      color: #79879c;
    }
  }
`;

export const TextDiv = styled.div`
  min-width: 160px;
  padding-right: 20px;

  &:first-of-type {
    min-width: 200px;
  }

  .title {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;

    font-size: 12px;
    line-height: 1.67;

    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    font-weight: bold;
    color: #242e42;
  }

  .description {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;

    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: #79879c;
  }
`;

export const AddWrapper = styled.div`
  position: relative;
  background: red;
  padding: 11px 12px;
  border-radius: 4px;
  border: 1px dashed #ccd3db;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &.withIcon {
    padding-left: 64px;
  }

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
    border-color: #242e42;
  }

  &.empty {
    height: auto;
    padding: 28px 0;
    text-align: center;

    .icon {
      position: relative;
      left: 0;
      top: 0;
      transform: none;
      margin: 0 auto;
      margin-bottom: 4px;
    }
  }
`;
