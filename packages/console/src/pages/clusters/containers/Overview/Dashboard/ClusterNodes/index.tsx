/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Card } from '@kubed/components';
import NodesTopFive from './NodesTopFive';

interface Props {
  cluster?: string;
}

function ClusterNodes({ cluster }: Props) {
  return (
    <Card sectionTitle={t('NODE_PL')} className="mt12">
      <NodesTopFive cluster={cluster} />
    </Card>
  );
}

export default ClusterNodes;
