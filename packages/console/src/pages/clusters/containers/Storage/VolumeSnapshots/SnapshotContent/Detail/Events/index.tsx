import React from 'react';
import { Events, useDetailPage, VolumeSnapshotContentDetail } from '@ks-console/shared';

export default function DetailMetaData() {
  const { detail = {} } = useDetailPage<VolumeSnapshotContentDetail>();
  return <Events detail={detail} module="volumesnapshotcontent" />;
}
