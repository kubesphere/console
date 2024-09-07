/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Entity } from '@kubed/components';

import type { FormattedCluster } from '@ks-console/shared';
import { ClusterTitle } from '@ks-console/shared';

import { Title, ClustersWrapper } from './InstalledClustersTab.styles';

interface InstalledClustersTabProps {
  formattedClusters: FormattedCluster[];
}

function InstalledClustersTab({ formattedClusters }: InstalledClustersTabProps) {
  return (
    <>
      <Title>{t('INSTALLED_CLUSTER_AGENT')}</Title>
      <ClustersWrapper>
        {formattedClusters.map(formattedCluster => (
          <Entity key={formattedCluster.name}>
            <ClusterTitle cluster={formattedCluster} statusReasonProps={{ hasTip: false }} />
          </Entity>
        ))}
      </ClustersWrapper>
    </>
  );
}

export { InstalledClustersTab };
