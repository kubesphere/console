/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  .fields-card {
    display: flex;
    flex-direction: row;

    & > * {
      flex-grow: unset;
      width: 120px;
      margin-right: 9px;
    }

    a:hover {
      .field-label,
      .field-value {
        color: #55bc8a;
      }
    }

    .version-field {
      width: inherit;
    }
  }

  .stat-card {
    padding: 0 0 12px;

    a:hover {
      .field-label,
      .field-value {
        color: #55bc8a;
      }

      .kubed-icon {
        color: #00aa72;
        fill: #90e0c5;
      }
    }
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  .card {
    height: 170px;
    min-width: calc((100% - 20px) / 2);

    &:hover {
      box-shadow: 0px 6px 16px 0px rgba(36, 46, 66, 0.2);
      .image {
        display: none;
      }
      .hoverImage {
        display: inline-block;
      }
    }
    .field-value {
      p {
        display: flex;
        align-items: center;
        margin: 0;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;

        span {
          margin-left: 8px;
          border-radius: 4px;
          background: linear-gradient(129deg, #ef8 0%, #45ff4c 100%);
          color: #404f68;
          font-family: Inter;
          font-size: 12px;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: -0.24px;
          padding: 0px 4px;
        }
      }
    }
    .field-label {
      line-height: 20px;
    }
    .numbers {
      margin-top: 20px;
      .field-value {
        font-size: 28px;
        line-height: 44px;
      }
    }
  }
  .stat-card {
    padding: 20px;
    img {
      position: absolute;
      right: 0;
      top: 0;

      &.hoverImage {
        display: none;
      }
    }
  }
`;
