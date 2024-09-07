/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { find } from 'lodash';

import { ClusterIcon } from '@ks-console/shared';

import type { FormattedInstallPlan } from '../../../../../stores/extension';
import type { FormattedCluster } from '../../../../../stores/cluster';
import type { GetClusterStatusStateInfoOptions } from '../../utils/status';
import { getClusterStatusStateInfo } from '../../utils/status';
import {
  ClusterItem,
  ClusterInfos,
  ClusterName,
  ClusterStatus,
  ClusterStatusText,
} from './ClusterTabLabel.styles';

interface ClusterTabLabelProps {
  isSelected: boolean;
  formattedCluster: FormattedCluster;
  formattedInstallPlan: FormattedInstallPlan;
}

function ClusterTabLabel({
  isSelected,
  formattedCluster,
  formattedInstallPlan,
}: ClusterTabLabelProps) {
  const clusterName = formattedCluster.name;
  const { isUninstall, clusterSchedulingStatuses } = formattedInstallPlan;
  const clusterSchedulingStatus = (() => {
    const data = find(clusterSchedulingStatuses, { clusterName });
    if (isUninstall && !data) {
      return {
        isUninstall,
        isUninstalled: true,
      } as GetClusterStatusStateInfoOptions;
    }
    return data;
  })();
  const statusStateInfo = clusterSchedulingStatus
    ? getClusterStatusStateInfo(clusterSchedulingStatus)
    : null;

  return (
    <ClusterItem>
      <ClusterIcon
        cluster={formattedCluster}
        theme={isSelected ? 'light' : 'dark'}
        noStatus
        size={40}
      />
      <ClusterInfos>
        <ClusterName as="span" $isSelected={isSelected}>
          {clusterName}
        </ClusterName>
        <ClusterStatus>
          <ClusterStatusText>{statusStateInfo?.text}</ClusterStatusText>
          {statusStateInfo?.icon}
        </ClusterStatus>
      </ClusterInfos>
    </ClusterItem>
  );
}

export { ClusterTabLabel };
