/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Description } from '@kubed/components';
import styled from 'styled-components';

export const DefaultWrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #ffffff;
  border: solid 1px ${({ theme }) => theme.palette.accents_2};

  .showSecret .desc-content {
    text-overflow: unset;
    white-space: unset;
  }
`;

export const StyledDescription = styled(Description)`
  border-radius: 22px;
  display: flex;
  gap: 80px;

  .desc-label {
    max-width: 160px;
    min-width: 160px;
  }

  .desc-content {
    flex: 1;
    margin-left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const CardTitle = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;

  & > button {
    position: absolute;
    right: 0;
    z-index: 10;
  }
`;

export const TlsWrapper = styled.div`
  padding: 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};

  & > div {
    & + div {
      margin-top: 20px;
    }

    h6 {
      font-size: 14px;
      line-height: 1.43;
      margin-bottom: 8px;
    }

    & > pre {
      padding: 12px;
      border-radius: 4px;
      background-color: #ffffff;
      border: solid 1px ${({ theme }) => theme.palette.accents_2};
      white-space: pre-wrap;
    }
  }
`;

export const ImageWrapper = styled.div`
  ul > li {
    padding: 20px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.accents_0};

    & + li {
      margin-top: 12px;
    }

    h6 {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-bottom: 8px;
      line-height: 1.43;

      .kubed-icon {
        margin-right: 14px;
      }
    }

    & > ul {
      padding: 12px;
      border-radius: 4px;
      background-color: #ffffff;
      border: solid 1px ${({ theme }) => theme.palette.accents_2};

      & > li {
        display: flex;
        padding: 12px 20px;
        border-radius: 22px;
        background-color: ${({ theme }) => theme.palette.accents_1};
        border: solid 1px ${({ theme }) => theme.palette.border};

        & + li {
          margin-top: 8px;
        }

        & > span {
          word-break: break-all;

          &:first-child {
            min-width: 160px;
            margin-right: 80px;
            color: ${({ theme }) => theme.palette.accents_5};
          }
        }
      }
    }
  }
`;
