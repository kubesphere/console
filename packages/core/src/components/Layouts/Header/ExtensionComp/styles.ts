/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Empty } from '@kubed/components';

export const ExtensionButtonStyle = styled.div`
  margin-right: 20px;

  .extension-button {
    padding: 0 12px;
    border: none;
    border-radius: 32px;
    background-color: inherit;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.palette.accents_2};
    }
  }

  .extension-icon {
    width: 16px;
    height: 16px;
  }
`;

export const ExtensionDrawerContent = styled.div`
  height: 100vh;
  .header {
    position: relative;
    padding: 12px 20px;
    box-shadow: 0px -1px 0px 0px #d8dee5 inset;
    .close-button {
      position: absolute;
      top: 14px;
      right: 20px;
      z-index: 10;
      border-radius: 4px;
      height: 32px;
      padding: 3px;
    }
  }
  .content {
    height: calc(100vh - 62px);
    display: flex;
    padding: 20px;
    gap: 12px;
    background-color: ${({ theme }) => theme.palette.accents_1};
    padding: 20px;
    gap: 12px;
    overflow-y: auto;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: center;

    .item {
      position: relative;
      text-align: center;
      height: 120px;
      width: 140px;
      padding: 8px;
      border-radius: 4px;
      gap: 4px;
      background-color: #fff;
      border: 1px solid transparent;
      transition: all 0.3s ease-in-out;

      img {
        width: 48px;
        height: 48px;
      }

      span {
        display: block;
      }

      &:hover {
        border: 1px solid #79879c;
        box-shadow: 0px 4px 8px 0px rgba(36, 46, 66, 0.2);
      }

      .desc {
        width: 100%;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        font-weight: 600;
        line-height: 20px;
      }

      .license-error-tip {
        position: absolute;
        top: 12px;
        right: 12px;
      }
    }
  }
`;

export const StyledEmpty = styled(Empty)`
  background: #fff;
  width: 100%;
  height: 204px;

  .imageClass {
    margin-bottom: 14px;

    .kubed-icon {
      margin-bottom: 0;
    }
  }

  .empty-desc {
    padding: 0 32px;
  }
`;
