/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Item, NoModule, PlaceholderBox, StyledField } from './NetworkIsolation.styles';
import {
  ClusterTitle,
  FormattedCluster,
  hasClusterExtensionModule,
  Icon,
  OriginalWorkspace,
  request,
  workspaceStore,
} from '@ks-console/shared';
import { Switch } from '@kubed/components';
import React from 'react';
import { useQuery } from 'react-query';
import { getEnabledActions } from '../../utils';

type ClusterItemProps = {
  // 企业空间名称
  workspace: string;
  // 单个集群信息
  formattedCluster: FormattedCluster;
};

const { useUpdateMultiClusterNetworkIsolationMutation } = workspaceStore;
export const ClusterItem = ({ formattedCluster, workspace }: ClusterItemProps) => {
  const { name: clusterName } = formattedCluster;
  const enabledActions = getEnabledActions(workspace);
  const url = `/clusters/${clusterName}/apis/tenant.kubesphere.io/v1beta1/workspaces/${workspace}`;
  const { data, refetch } = useQuery({
    queryKey: url,
    queryFn: () => request.get<never, OriginalWorkspace>(url).catch(err => Promise.reject(err)),
    enabled: !!clusterName && !!workspace,
  });
  const multiClusterMutation = useUpdateMultiClusterNetworkIsolationMutation({
    onSuccess: () => refetch(),
  });
  const field = data?.metadata?.annotations?.['kubesphere.io/network-isolate'];
  const isNetworkIsolationEnabled = field ? field === 'enabled' : false;

  return (
    <Item key={clusterName}>
      <ClusterTitle className="cluster-title" cluster={formattedCluster} />
      <StyledField
        avatar={<Icon size={40} name="firewall" />}
        value={t(isNetworkIsolationEnabled ? 'ON' : 'OFF')}
        label={t('WS_NETWORK_ISOLATION')}
      />
      <PlaceholderBox />
      {workspace &&
        enabledActions.includes('manage') &&
        (hasClusterExtensionModule(clusterName, 'network') ? (
          <Switch
            variant="button"
            label={t(isNetworkIsolationEnabled ? 'ON' : 'OFF')}
            checked={isNetworkIsolationEnabled}
            onChange={checked => {
              multiClusterMutation.mutate({
                workspace,
                clusterName,
                isNetworkIsolationEnabled: checked,
              });
            }}
          />
        ) : (
          <NoModule>{t('NETWORK_POLICY_UNINSATLLED_DESC')}</NoModule>
        ))}
    </Item>
  );
};
