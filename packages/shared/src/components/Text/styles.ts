/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const TextWrapper = styled.div`
  position: relative;
  display: flex;

  .text {
    flex: 1;
    & > div:first-child {
      font-size: 12px;
      line-height: 1.67;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      font-weight: bold;
      color: #242e42;
    }

    & > div:last-child {
      font-size: 12px;
      line-height: 1.67;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      font-weight: bold;
      color: #79879c;
    }
  }

  &.ellipsis {
    flex: 1;
    overflow: hidden;

    .text {
      flex: 1;
      overflow: hidden;

      & > div {
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        overflow: hidden;
      }
    }
  }

  svg.kubed-icon {
    margin-right: 12px;
  }

  &.clickable {
    cursor: pointer;

    &:hover {
      .text {
        & > div {
          color: #55bc8a;
        }
      }
      .icon {
        :global .kubed-icon {
          color: #00aa72;
          fill: #90e0c5;
        }
      }
    }
  }
`;
