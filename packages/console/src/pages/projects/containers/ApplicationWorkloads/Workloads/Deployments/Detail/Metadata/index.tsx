/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useCacheStore as useStore } from '@ks-console/shared';
import { Loading } from '@kubed/components';
import { MetaData } from '@ks-console/shared';

const Metadata = () => {
  const [props] = useStore('DeploymentDetailProps');
  const { detail, isLoading } = props;

  return isLoading ? <Loading className="page-loading" /> : <MetaData detail={detail} />;
};

export default Metadata;
