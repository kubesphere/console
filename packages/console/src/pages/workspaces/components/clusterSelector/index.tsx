/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import {
  StatusReason,
  useClusterStore,
  useWorkspaceSelectedClusterStore,
} from '@ks-console/shared';
import { Select } from '@kubed/components';
import styled from 'styled-components';

const Option = Select.Option;

const StyledSelect = styled(Select)`
  width: 200px;
  font-size: 12px;
  margin-left: 15px;
  .kubed-select-selector {
    color: #fff;
    background-color: #242e42;
    box-shadow: none;
    border: none;
  }
  .kubed-icon {
    fill: #b6c2cd;
    color: #fff;
  }
`;

function ClusterSelector() {
  const { clusters } = useClusterStore();
  const { selectedCluster, setSelectedCluster } = useWorkspaceSelectedClusterStore();
  const clustersOpts = clusters?.map(cluster => {
    return {
      label: cluster.name,
      value: cluster.name,
      disabled: !cluster.isReady,
      cluster,
    };
  });
  const handleClusterChange = (val: string) => {
    setSelectedCluster(val);
  };

  return (
    <StyledSelect onChange={handleClusterChange} value={selectedCluster} title={selectedCluster}>
      {clustersOpts?.map(item => (
        <Option value={item.value} title={item.value} key={item.value} disabled={item.disabled}>
          <div>{item.value}</div>
          {!item.cluster.isReady && (
            <div>
              <StatusReason data={item.cluster} hasTip={false} />
            </div>
          )}
        </Option>
      ))}
    </StyledSelect>
  );
}

export default ClusterSelector;
