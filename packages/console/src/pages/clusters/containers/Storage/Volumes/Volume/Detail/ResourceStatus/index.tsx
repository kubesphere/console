/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { useCacheStore as useStore } from '@ks-console/shared';
import { useParams } from 'react-router-dom';
import { PodsCard, hasPermission } from '@ks-console/shared';
import UsageCard from './UsageCard';

export default function ResourceStatus() {
  const [detail] = useStore('detailProps');
  const params = useParams();

  const canViewPods = useMemo(
    () =>
      hasPermission({
        ...params,
        module: 'pods',
        action: 'view',
      }),
    [],
  );

  const prefix = useMemo(() => {
    if (!canViewPods) {
      return undefined;
    }

    const { workspace, cluster } = params;
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}`;
  }, []);

  return (
    <>
      <UsageCard<typeof detail> title={t('PERSISTENT_VOLUME')} detail={detail} />
      <PodsCard title={t('MOUNTED_PODS')} detail={{ ...params, kind: 'PVC' }} prefix={prefix} />
    </>
  );
}
