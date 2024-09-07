/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

interface ItemPrps {
  active: boolean;
  onClick: (e: Event) => void;
}

export const WrapperCard = styled.div`
  border-radius: 4px;
  overflow: hidden;
`;
export const TabHeader = styled.div`
  padding: 0 12px;
  background-color: #f9fbfd;
`;
export const TabHeaderItem = styled.div`
  display: inline-block;
  width: 207px;
  padding: 12px;
  cursor: pointer;
  background-color: ${({ active }: ItemPrps) => (active ? '#fff' : 'transparent')};
  &:hover {
    background-color: #fff;
  }
`;
export const TabContent = styled.div`
  padding: 12px;
`;
