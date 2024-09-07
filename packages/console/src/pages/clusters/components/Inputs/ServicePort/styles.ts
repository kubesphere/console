/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Input, Select } from '@kubed/components';
import styled from 'styled-components';
import { NumberInput } from '@ks-console/shared';

export const Wrapper = styled.div`
  display: flex;

  & > div {
    margin-left: 6px;

    &:first-of-type {
      margin-left: 0px;
    }
  }
`;

export const StyledSelect = styled(Select)`
  .kubed-select-selector {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const PrefixWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledInput = styled(Input)`
  background-color: #fff;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  & > input {
    height: 30px;
  }
`;

export const StyledNumberInput = styled(NumberInput)`
  background-color: #fff;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  & > input {
    height: 30px;
  }
`;
