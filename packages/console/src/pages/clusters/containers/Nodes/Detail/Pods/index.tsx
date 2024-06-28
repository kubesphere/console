import React from 'react';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import { PodsCard } from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';

function Pods() {
  const params = useParams();
  const [detail] = useStore('detailProps');
  if (isEmpty(detail)) return null;
  return <PodsCard detail={detail} limit={10} prefix={`/clusters/${params.cluster}`} />;
}
export default Pods;
