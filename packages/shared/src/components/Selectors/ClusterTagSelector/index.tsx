/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Select, Tag } from '@kubed/components';
import styled from 'styled-components';

import { CLUSTER_PRESET_GROUPS, CLUSTER_GROUP_TAG_TYPE } from '../../../constants/common';

const { Option } = Select;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .env-tag {
    margin-right: 8px;
  }
`;

// export interface ProviderSelectorProps {
//
// }

// todo need improve component interface
const ClusterTagSelector = (props: any) => {
  return (
    <Select optionLabelProp="label" {...props}>
      {CLUSTER_PRESET_GROUPS.map(item => {
        const label = (
          <OptionWrapper>
            <Tag className="env-tag" color={CLUSTER_GROUP_TAG_TYPE[item.value]}>
              {t(`ENV_${item.label?.toUpperCase()}`)}
            </Tag>
            {item.label}
          </OptionWrapper>
        );
        return (
          <Option value={item.value} label={label} key={item.value}>
            <OptionWrapper>
              <Tag className="env-tag" color={CLUSTER_GROUP_TAG_TYPE[item.value]}>
                {t(`ENV_${item.label?.toUpperCase()}`)}
              </Tag>
              {item.label}
            </OptionWrapper>
          </Option>
        );
      })}
    </Select>
  );
};

export default ClusterTagSelector;
