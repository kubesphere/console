/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo, useState } from 'react';

import IngressesItem from './Item';
import ResourceCard from '../ResourceCard';
import { EmptyTips } from './styles';

type Props = {
  detail: any;

  params: Record<string, string>;
};

function Ingresses({ detail, params }: Props): JSX.Element {
  const { workspace, cluster, namespace } = params;
  const prefix = workspace
    ? `/${workspace}/clusters/${cluster}/projects/${namespace}`
    : `/clusters/${cluster}/projects/${namespace}`;
  const [ingressList, setIngressList] = useState<any[]>([]);

  const list = useMemo(
    () =>
      detail.map((item: any) => ({
        ...item,
        module: item.kind,
        ...item.metadata,
      })),
    [detail],
  );
  useEffect(() => {
    if (!list) return;
    const ingressItems = list.filter((item: any) => item.kind === 'Ingress');
    setIngressList(ingressItems);
  }, [list]);
  return (
    <ResourceCard
      title={t('ROUTE_PL')}
      data={ingressList}
      emptyPlaceholder={
        <EmptyTips>{t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('ROUTE_PL') })}</EmptyTips>
      }
      itemRender={item => (
        <IngressesItem params={params} key={item.name} prefix={prefix} ingress={item} />
      )}
    />
  );
}

export default Ingresses;
