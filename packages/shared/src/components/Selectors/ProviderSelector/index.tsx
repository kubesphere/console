/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Select } from '@kubed/components';
import styled from 'styled-components';

import Icon from '../../Icon';
import { CLUSTER_PROVIDERS } from '../../../constants/common';

const { Option } = Select;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .kubed-icon {
    margin-right: 8px;
  }
`;

// export interface ProviderSelectorProps {
//
// }

// todo need improve component interface
const ProviderSelector = (props: any) => {
  return (
    <Select optionLabelProp="label" {...props}>
      {CLUSTER_PROVIDERS.map(item => {
        const label = (
          <OptionWrapper>
            <Icon name={item.icon} size={20} />
            {item.label}
          </OptionWrapper>
        );
        return (
          <Option value={item.value} label={label} key={item.value}>
            <OptionWrapper>
              <Icon name={item.icon} variant="light" size={20} />
              {item.label}
            </OptionWrapper>
          </Option>
        );
      })}
    </Select>
  );
};

export default ProviderSelector;
