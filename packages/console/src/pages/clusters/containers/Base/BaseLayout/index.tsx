/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { set } from 'lodash';
import { useQueries } from 'react-query';
import { useCacheStore as useStore } from '@ks-console/shared';
import { Loading } from '@kubed/components';
import { Outlet, useParams } from 'react-router-dom';
import { apis, ClusterDetail, clusterStore } from '@ks-console/shared';

const { fetchDetail } = clusterStore;

const BaseLayout = () => {
  const { cluster } = useParams();
  const [, setCluster] = useStore<ClusterDetail>('cluster');

  const result = useQueries([
    {
      queryKey: ['clusters', cluster],
      queryFn: () => {
        return fetchDetail({ name: cluster });
      },
      onSuccess: (data: ClusterDetail) => {
        setCluster(data);
        set(globals, `clusterConfig.${cluster}`, {
          ...data.configz,
          k8sVersion: data.kubernetesVersion,
        });
      },
    },
    {
      queryKey: ['authRule', cluster],
      queryFn: () => {
        return apis.fetchRules({ cluster, name: globals.user.username });
      },
    },
  ]);

  if (result[0].isLoading || result[1].isLoading) {
    return <Loading className="page-loading" />;
  }

  return <Outlet />;
};

export default BaseLayout;
