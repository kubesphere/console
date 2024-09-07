/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Events } from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';

export default function DetailMetaData() {
  const [props] = useStore('DaemonSetDetailProps');
  const { detail, module } = props;
  return <Events detail={detail} module={module} />;
}
