/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ChartIdsWrapper = styled.div`
  max-width: 455px;
`;

export const KeyWordsWrapper = styled.div`
  max-width: 455px;
`;

export const TagsWrapper = styled.div`
  margin-top: 4px;
  padding: 12px 12px 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 4px;
  min-height: 80px;

  .tag {
    margin: 0 8px 4px 0;
  }
`;

export const TagsTitle = styled.p`
  margin: 8px 0 0 0;
`;

export const EmptyTips = styled.div`
  line-height: 56px;
  text-align: center;
  color: ${({ theme }) => theme.palette.accents_5};
`;
