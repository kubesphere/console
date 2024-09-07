/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Form, Select } from '@kubed/components';

export const Container = styled.div`
  position: relative;

  .select {
    position: absolute;
    display: inline-block;
    position: absolute;
    left: 5px;
    top: 4px;
    width: 102px !important;
    z-index: 1;
    & > div {
      height: 24px !important;
      border: none;
      background: #242e42;
    }
    .kubed-select-selection-search {
      height: 24px;
    }
    .kubed-select-selection-item {
      color: white !important;
      line-height: 24px;
    }
    .kubed-select-arrow {
      svg {
        color: white;
      }
    }
  }

  input {
    text-indent: 100px;
  }
`;

export const SelectStyle = styled(Select)``;
