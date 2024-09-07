/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { MetaData } from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';

export default function DetailMetaData() {
  const [detail] = useStore('detailProps');

  return <MetaData detail={detail} />;
}
