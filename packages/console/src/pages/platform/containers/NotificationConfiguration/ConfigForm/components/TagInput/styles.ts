/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const FilterInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  height: 32px;
  padding: 0 8px 2px;
  overflow: auto;
  background-color: #fff;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.palette.accents_4};
  color: ${({ theme }) => theme.palette.accents_7};

  .tag {
    padding: 0 8px;
    margin-top: 4px;
    font-weight: 400;
  }

  .autosuggest {
    margin-top: 4px;

    input {
      display: inline-block;
      height: 20px;
      border: none;
      color: ${({ theme }) => theme.palette.accents_7};
    }
  }
`;
