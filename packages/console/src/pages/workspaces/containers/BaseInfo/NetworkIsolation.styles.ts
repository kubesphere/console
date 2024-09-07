/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Field } from '@kubed/components';

export const Empty = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.43;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const PlaceholderBox = styled.div`
  flex: 1;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};

  .cluster-title {
    flex: inherit;
    width: 50%;
    min-width: 252px;
    margin-right: 20px;
  }
`;

export const StyledField = styled(Field)`
  flex: inherit;
  min-width: 252px;
  margin-right: 20px;
`;

export const NoModule = styled.span`
  font-size: 14px;
  line-height: 1.43;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.accents_5};
`;
