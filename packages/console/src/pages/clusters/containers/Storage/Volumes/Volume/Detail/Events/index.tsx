import React from 'react';
import { Events, useDetailPage, VolumeDetail } from '@ks-console/shared';

export default function DetailMetaData() {
  const { detail } = useDetailPage<VolumeDetail>();
  return <Events detail={detail} module="persistentvolumeclaim" />;
}
