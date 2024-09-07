/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { FilterInput } from '@kubed/components';

export const Wrapper = styled.div`
  width: 526px;
  margin: 0 auto;
  padding-bottom: 40px;
`;

export const SearchInput = styled(FilterInput)`
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 30px;
  background-color: #fff;
  font-size: 16px;
  font-weight: 400;
  box-shadow: 0 4px 8px rgba(36, 46, 66, 0.06);

  & > .icon-search {
    width: 20px;
    height: 20px;
  }

  & > div {
    width: 100%;
  }
`;
