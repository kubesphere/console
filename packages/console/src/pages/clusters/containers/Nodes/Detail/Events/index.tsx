import React from 'react';
import { Events } from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';

export default function DetailMetaData() {
  const [detail] = useStore('detailProps');
  return <Events detail={detail} module="nodes" />;
}
