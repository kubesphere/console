/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useQueries } from 'react-query';

import { joinSelector, gatewayStore } from '@ks-console/shared';

import IngressesItem from './Item';
import ResourceCard from '../ResourceCard';
import { useBaseK8sList } from '../../store';

const { fetchDetail } = gatewayStore;

type Props = {
  cluster?: string;
  namespace?: string;
  prefix?: string;
  title?: string;
  selector?: any;
};

function Ingresses({ title, cluster, namespace, selector, prefix }: Props): JSX.Element {
  const k8sParams = useMemo(() => {
    if (!isEmpty(selector)) {
      return {
        cluster,
        namespace,
        labelSelector: joinSelector(selector),
      };
    }

    return {};
  }, [selector]);
  const gateWays = useQueries([
    {
      queryKey: ['gateWay', 'cluster', cluster],
      queryFn: () => fetchDetail({ cluster }),
      enabled: !!cluster,
    },
    {
      queryKey: ['gateWay', 'namespace', cluster, namespace],
      queryFn: () => fetchDetail({ cluster, namespace }),
      enabled: !!cluster && !!namespace,
    },
  ]);
  const { data } = useBaseK8sList({
    module: 'ingresses',
    params: k8sParams,
    autoFetch: gateWays[0].isSuccess && gateWays[1].isSuccess,
  });

  return (
    <ResourceCard
      title={title || t('ROUTE_PL')}
      data={data}
      itemRender={item => (
        <IngressesItem
          key={item.name}
          prefix={prefix}
          detail={item}
          gateway={gateWays[0].data || gateWays[1].data}
        />
      )}
    />
  );
}

export default Ingresses;
