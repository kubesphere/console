/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const NumberInputWrapper = styled.div`
  .withUnit {
    position: relative;

    input.input {
      min-width: 72px;
      padding-right: 28px;
      text-align: left;
    }

    span {
      position: absolute;
      top: 6px;
      right: 8px;
      color: #5f708a;
    }
  }
`;
