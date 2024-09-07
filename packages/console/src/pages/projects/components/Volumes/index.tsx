/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';

import { joinSelector } from '@ks-console/shared';

import VolumesItem from './Item';
import ResourceCard from '../ResourceCard';
import { useBaseK8sList } from '../../store';

type Props = {
  cluster?: string;
  namespace?: string;
  prefix?: string;
  selector?: any;
};

function Volumes({ cluster, namespace, selector, prefix }: Props): JSX.Element {
  const params = useMemo(() => {
    if (!isEmpty(selector)) {
      return {
        cluster,
        namespace,
        labelSelector: joinSelector(selector),
      };
    }

    return {};
  }, [selector]);
  const { data: volumes = [] } = useBaseK8sList({
    module: 'persistentvolumeclaims',
    params,
    autoFetch: !isEmpty(params),
  });

  return (
    <ResourceCard
      data={volumes}
      title={t('VOLUME_PL')}
      itemRender={item => (
        <VolumesItem key={`${item.module}-${item.name}`} prefix={prefix} detail={item} />
      )}
    />
  );
}

export default Volumes;
