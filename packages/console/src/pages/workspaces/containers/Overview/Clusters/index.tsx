/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isEmpty } from 'lodash';
import { FormattedCluster, isMultiCluster, useClusterStore } from '@ks-console/shared';
import { Cluster } from '@kubed/icons';
import { EmptyWrapper } from './styles';
import ClusterCard from './Card';
import { Card } from '@kubed/components';

function Clusters() {
  const { clusters } = useClusterStore();
  if (!isMultiCluster()) {
    return null;
  }

  if (isEmpty(clusters)) {
    return (
      <Card>
        <EmptyWrapper
          image={<Cluster size={48} />}
          title={t('NO_CLUSTER_AVAILABLE')}
          description={t('WORKSPACE_NO_CLUSTER_TIP')}
        />
      </Card>
    );
  }

  return (
    <>
      {clusters.map((cluster: FormattedCluster) => (
        <ClusterCard key={cluster.name} cluster={cluster} />
      ))}
    </>
  );
}

export default Clusters;
