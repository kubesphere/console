/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PodsCard, useDetailPage } from '@ks-console/shared';
import { useMemo } from 'react';
import * as React from 'react';

const ProjectPods = () => {
  const { params } = useDetailPage();
  const prefix = useMemo(() => {
    const { workspace, cluster } = params!;
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}`;
  }, []);
  return (
    <PodsCard title={t('MOUNTED_PODS')} detail={{ ...params, kind: 'Namespace' }} prefix={prefix} />
  );
};

export default ProjectPods;
