import React, { useState, useEffect } from 'react';
import WorkloadItem, { Detail } from './Item';
import ResourceCard from '../ResourceCard';
import { EmptyTips } from '../styles';

type Props = {
  prefix?: string;
  detail: any[];
  params: Record<string, string>;
};

function Workloads({ detail, params }: Props): JSX.Element | null {
  const { workspace, cluster, namespace } = params;
  const prefix = workspace
    ? `/${workspace}/clusters/${cluster}/projects/${namespace}`
    : `/clusters/${cluster}/projects/${namespace}`;
  const [selectItem, setSelectItem] = useState<any[]>([]);
  const [listMap, setListMap] = useState<any[]>([]);
  const list = detail.map(item => ({
    ...item,
    module: item.kind,
    ...item.metadata,
  }));

  useEffect(() => {
    if (!list) return;
    const deploymentItems = list.filter(item => item.kind === 'Deployment');
    setListMap(deploymentItems);
  }, []);

  function handleWorkloadItem(item: Detail, check: boolean) {
    const val = selectItem?.filter(workload => workload.name !== item.name);
    if (check) {
      val.push(item);
    }
    setSelectItem(val);
  }

  function itemRender(item: any) {
    return (
      <WorkloadItem
        selectItem={selectItem?.find(select => select.name === item.name)}
        setSelectItem={val => handleWorkloadItem(item, !!val)}
        key={`${item.module}-${item.name}`}
        prefix={`${prefix}/deployments`}
        detail={item}
      />
    );
  }
  if (!listMap.length) return null;
  return (
    <>
      <ResourceCard
        key="Deployment"
        title={t('WORKLOAD_PL')}
        data={listMap}
        emptyPlaceholder={
          <EmptyTips>{t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('WORKLOAD') })}</EmptyTips>
        }
        itemRender={item => itemRender(item)}
      />
    </>
  );
}

export default Workloads;
