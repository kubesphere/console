import { MetaData, useDetailPage, VolumeSnapshotContentDetail } from '@ks-console/shared';
import React from 'react';

export default function DetailMetaData() {
  const { detail = {} } = useDetailPage<VolumeSnapshotContentDetail>();

  return <MetaData detail={detail} />;
}
