/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { Wrapper } from '../styles';

export const WebHookWrapper = styled(Wrapper)`
  .kubed-select {
    width: 455px;
  }
`;

export const SubTitle = styled.div`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const ChannelsWrapper = styled.div`
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

export const EmptyTips = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.palette.accents_5};
  line-height: 56px;
`;

export const TagsTitle = styled.p`
  margin: 8px 0 0 0;
`;
