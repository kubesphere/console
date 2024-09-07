/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { Switch } from '@kubed/components';

import { isMultiCluster, hasKSModule, workspaceStore, Panel, Icon } from '@ks-console/shared';

import { Empty, PlaceholderBox, Items, Item, StyledField } from './NetworkIsolation.styles';
import { getEnabledActions } from '../../utils';
import { ClusterItem } from './ClusterItem';

const {
  useFetchWorkspaceQuery,
  useFetchWorkspaceClustersQuery,
  useUpdateSingleClusterNetworkIsolationMutation,
} = workspaceStore;

export function NetworkIsolation() {
  const params = useParams<'cluster' | 'workspace'>();
  const { workspace, cluster } = params;

  const enabledActions = getEnabledActions(workspace);
  const { workspaceDetail, refetch: refetchWorkspace } = useFetchWorkspaceQuery({
    workspace: workspace ?? '',
    cluster,
    enabled: Boolean(workspace),
  });

  const { isLoading, formattedClusters } = useFetchWorkspaceClustersQuery({
    workspace,
    hasDefaultCluster: false,
  });

  const singleClusterMutation = useUpdateSingleClusterNetworkIsolationMutation({
    onSuccess: () => refetchWorkspace(),
  });

  if (!isMultiCluster()) {
    if (!hasKSModule('network')) {
      return null;
    }

    const networkIsolation = workspaceDetail?.networkIsolation ?? false;

    return (
      <Panel title={t('NETWORK_ISOLATION')}>
        <Item>
          <StyledField
            avatar={<Icon size={40} name="firewall" />}
            value={t(networkIsolation ? 'ON' : 'OFF')}
            label={t('WS_NETWORK_ISOLATION')}
          />
          <PlaceholderBox />
          {workspaceDetail && enabledActions.includes('manage') && (
            <Switch
              variant="button"
              label={t(networkIsolation ? 'ON' : 'OFF')}
              checked={networkIsolation}
              onChange={checked =>
                singleClusterMutation.mutate({
                  workspaceDetail,
                  networkIsolation: checked,
                })
              }
            />
          )}
        </Item>
      </Panel>
    );
  }

  return (
    <Panel loading={isLoading} title={t('NETWORK_ISOLATION')}>
      {formattedClusters.length > 0 && !isLoading ? (
        <Items>
          {formattedClusters.map((formattedCluster, index) => {
            return (
              <ClusterItem key={index} workspace={workspace!} formattedCluster={formattedCluster} />
            );
          })}
        </Items>
      ) : (
        <Empty>{t('NO_CLUSTER_AVAILABLE')}</Empty>
      )}
    </Panel>
  );
}
