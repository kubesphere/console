/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { hasClusterModule, hasKSModule, isMultiCluster, useClusterStore } from '@ks-console/shared';
import { Card } from '@kubed/components';
import { Cluster } from '@kubed/icons';
import Physical from './Physical';
import ResourceStatistics from './Statistics';
import VirtualResource from './Virtual';
import { EmptyWrapper } from '../Clusters/styles';

export default function ResourcesUsage() {
  const { clusters } = useClusterStore();

  const hasWhizardMonitoring = clusters?.some(cluster =>
    hasClusterModule(cluster.name, 'whizard-monitoring'),
  );
  return (
    <>
      {!isMultiCluster() && <ResourceStatistics />}

      {isMultiCluster() &&
        (clusters?.length ? (
          hasWhizardMonitoring ? (
            <>
              <Physical />
              <VirtualResource />
            </>
          ) : (
            <ResourceStatistics />
          )
        ) : (
          <Card>
            <EmptyWrapper
              image={<Cluster size={48} />}
              title={t('NO_CLUSTER_AVAILABLE')}
              description={t('WORKSPACE_NO_CLUSTER_TIP')}
            />
          </Card>
        ))}
    </>
  );
}
