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
