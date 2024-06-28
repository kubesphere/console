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
    const serviceItems = list.filter(item => item.kind === 'Service');
    setListMap(serviceItems);
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
        prefix={`${prefix}/services`}
        detail={item}
      />
    );
  }
  if (!listMap.length) return null;
  return (
    <>
      <ResourceCard
        key="Service"
        title={t('Service')}
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
