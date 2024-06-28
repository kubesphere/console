import React from 'react';
import { useParams } from 'react-router-dom';

import { KubeConfigModal, pages } from '@ks-console/shared';

const { closePage } = pages;

export default function KubeConfig() {
  const params = useParams<'cluster'>();

  return <KubeConfigModal visible params={params} onCancel={closePage} />;
}
