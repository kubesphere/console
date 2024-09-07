/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ConfigFormWrapper = styled.div`
  margin-bottom: 12px;

  .loading {
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .button-flat {
    border: 1px solid transparent;
    background-color: transparent;

    &:hover {
      background-color: ${({ theme }) => theme.palette.accents_2};
    }

    &:active {
      background-color: #d8dee5;
    }
  }
`;
