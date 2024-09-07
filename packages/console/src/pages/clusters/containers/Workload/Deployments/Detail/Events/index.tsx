/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Events } from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';
import { isEmpty } from 'lodash';

export default function DetailMetaData() {
  const [props] = useStore('DeploymentDetailProps');
  const { detail, module } = props;
  return isEmpty(detail) ? null : <Events detail={detail} module={module} />;
}
