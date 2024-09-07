/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { PodsCard, serviceStore } from '@ks-console/shared';

const { fetchDetail } = serviceStore;

function ServiceDetail() {
  const params = useParams();
  const { data, isLoading } = useQuery(['serviceDetail', params], async () => {
    const res = await fetchDetail(params);
    return res;
  });

  if (isLoading || !data) {
    return null;
  }

  return <PodsCard detail={data} prefix={`/clusters/${params.cluster}`} />;
}

export default ServiceDetail;
