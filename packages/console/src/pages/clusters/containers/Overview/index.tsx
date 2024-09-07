/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { ClusterDetail, hasClusterModule, useCacheStore as useStore } from '@ks-console/shared';
import Dashboard from './Dashboard';
import Initializing from './Initializing';
import Embed from './embed';

function Overview() {
  const [cluster] = useStore<ClusterDetail>('cluster');

  if (!cluster?.isReady) {
    return <Initializing />;
  }
  if (hasClusterModule(cluster.name, 'whizard-monitoring')) {
    return <Embed />;
  }

  return <Dashboard />;
}

export default Overview;
