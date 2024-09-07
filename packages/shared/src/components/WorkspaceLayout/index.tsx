/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { get } from 'lodash';
import { useCacheStore as useStore } from '../../index';
import { useQueries } from 'react-query';
import { Loading } from '@kubed/components';
import { Outlet, useParams } from 'react-router-dom';
import { useWorkspaceSelectedClusterStore, workspaceStore } from '../../stores';
import { fetchRules } from '../../utils/apis';
import { useClusterStore } from '../../stores/useClustersStore';

const { fetchDetail, useFetchWorkspaceClustersQuery } = workspaceStore;

function WorkspaceLayout(): JSX.Element {
  const { workspace } = useParams();
  const { setSelectedCluster } = useWorkspaceSelectedClusterStore();
  const { setClusters } = useClusterStore();
  const { isLoading } = useFetchWorkspaceClustersQuery({
    workspace,
    onSuccess: data => {
      // set(
      //   globals.ksConfig,
      //   'devops',
      //   !!data.some((cluster: any) =>
      //     get(
      //       globals,
      //       `ksConfig.enabledExtensionModulesStatus.devops.clusterSchedulingStatuses.${cluster.name}`,
      //       false,
      //     ),
      //   ),
      // );
      setClusters([...data]);
      setSelectedCluster(
        get(
          data.find(cluster => cluster.isReady),
          'name',
        ) ?? '',
      );
    },
  });
  const [, setWorkspaceDetail] = useStore('workspaceDetail');
  const [workspaceResult, ruleResult] = useQueries([
    {
      queryKey: ['workspaces', workspace],
      queryFn: () => fetchDetail({ name: workspace }),
      enabled: !!workspace,
      onSuccess: (data: any) => setWorkspaceDetail(data),
    },
    {
      queryKey: ['workspace', 'authRule', workspace],
      queryFn: () => fetchRules({ workspace, name: globals.user.username }),
      enabled: !!workspace,
    },
  ]);
  const isInitializing = useMemo<boolean>(
    () => workspaceResult.isLoading || ruleResult.isLoading,
    [workspaceResult.isLoading, ruleResult.isLoading],
  );

  if (isInitializing || isLoading) {
    return <Loading className="page-loading" />;
  }

  return <Outlet />;
}

export default WorkspaceLayout;
