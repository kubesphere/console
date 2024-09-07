/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Text } from '@kubed/components';

export const AppDetailWrapper = styled.div`
  .mb32 {
    margin-bottom: 32px;
  }

  .versions {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.palette.border};
    border-collapse: collapse;
    border-spacing: 0;
    text-align: left;

    th,
    td {
      padding: 12px 10px;
      font-size: 12px;
      line-height: 20px;
      text-align: left;
      border-right: 1px solid #d1d7df;
      border-bottom: 1px solid #d1d7df;
      vertical-align: middle;

      &:first-child {
        width: 25%;
      }
    }

    th {
      color: ${({ theme }) => theme.palette.accents_5};
    }

    td {
      > .name {
        color: ${({ theme }) => theme.palette.accents_8};
        font-weight: bold;
      }

      > .date {
        color: ${({ theme }) => theme.palette.accents_5};
      }

      > .desc {
        color: ${({ theme }) => theme.palette.accents_8};
      }
    }
  }
`;

export const LabelText = styled(Text)`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const ImageItem = styled.div`
  margin-right: 20px;
`;
