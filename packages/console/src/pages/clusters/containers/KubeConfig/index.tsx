/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useParams } from 'react-router-dom';

import { KubeConfigModal, pages } from '@ks-console/shared';

const { closePage } = pages;

export default function KubeConfig() {
  const params = useParams<'cluster'>();

  return <KubeConfigModal visible params={params} onCancel={closePage} />;
}
