/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const AppBaseWrapper = styled.div``;

export const BaseItem = styled.div`
  padding: 6px 0;
  display: flex;
`;

export const ItemLabel = styled.span`
  max-width: 120px;
  min-width: 120px;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const ItemValue = styled.div`
  flex: 1;
`;
