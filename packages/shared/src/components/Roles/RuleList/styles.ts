/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ListWrapper = styled.ul`
  & > li {
    padding: 20px 24px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.colors.white[0]};

    & + li {
      margin-top: 8px;
    }
  }

  div {
    vertical-align: middle;
    color: #5f708a;
  }
`;

export const NameWrapper = styled.div`
  float: left;
  width: 200px;
  height: 60px;
  margin-right: 60px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  color: ${({ theme }) => theme.palette.colors.dark[3]};
`;
