/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  margin: 0 -6px;
`;

export const WrapContent = styled(Content)`
  flex-wrap: wrap;
`;

export const Wrapper = styled.div<{ count?: number }>`
  width: calc(100% / ${({ count }) => count || 3});
  padding: 6px;
`;

export const Item = styled.div`
  flex: 1;
  padding: 6px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  cursor: pointer;
`;

export const EmptyWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #abb4be;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  background-color: #f9fbfd;
  border-radius: 4px;
`;

export const Main = styled.div`
  position: relative;
  min-height: 150px;
  padding-top: 20px;
`;
