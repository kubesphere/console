/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Events, useDetailPage, VolumeDetail } from '@ks-console/shared';

export default function DetailMetaData() {
  const { detail } = useDetailPage<VolumeDetail>();
  return <Events detail={detail} module="persistentvolumeclaim" />;
}
