/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { useParams } from 'react-router-dom';

import { networkIPPoolStore, FormattedNetworkIPPool, PodsCard } from '@ks-console/shared';

function Pods() {
  const params: Record<string, any> = useParams();
  const { cluster, name, namespace } = params;

  const { useGetNetworkIPPool } = networkIPPoolStore;

  const { data: detail = {} as FormattedNetworkIPPool } = useGetNetworkIPPool({
    name,
    namespace,
    cluster,
  });

  return <PodsCard detail={detail} limit={10} prefix={`/clusters/${cluster}`} />;
}

export default Pods;
