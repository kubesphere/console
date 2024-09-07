/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { MetaData, useDetailPage, VolumeSnapshotContentDetail } from '@ks-console/shared';
import React from 'react';

export default function DetailMetaData() {
  const { detail = {} } = useDetailPage<VolumeSnapshotContentDetail>();

  return <MetaData detail={detail} />;
}
