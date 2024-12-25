/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo, useState } from 'react';
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
  const [deploymentList, setDeploymentList] = useState<any[]>([]);
  const [statefulSetList, setStatefulSetList] = useState<any[]>([]);
  const [daemonsetList, setDaemonsetList] = useState<any[]>([]);
  const list = useMemo(
    () =>
      detail.map(item => ({
        ...item,
        module: item.kind,
        ...item.metadata,
      })),
    [detail],
  );

  useEffect(() => {
    if (!list) return;
    const deploymentItems = list.filter(item => item.kind === 'Deployment');
    const statefulSetItems = list.filter(item => item.kind === 'StatefulSet');
    const daemonsetItems = list.filter(item => item.kind === 'DaemonSet');
    setDeploymentList(deploymentItems);
    setStatefulSetList(statefulSetItems);
    setDaemonsetList(daemonsetItems);
  }, [list]);

  function handleWorkloadItem(item: Detail, check: boolean) {
    const val = selectItem?.filter(workload => workload.name !== item.name);
    if (check) {
      val.push(item);
    }
    setSelectItem(val);
  }

  function itemRender(item: any) {
    const URL_MAP = {
      Deployment: 'deployments',
      StatefulSet: 'statefulsets',
      DaemonSet: 'daemonsets',
    };
    const url = URL_MAP[item.kind as keyof typeof URL_MAP];
    return (
      <WorkloadItem
        selectItem={selectItem?.find(select => select.name === item.name)}
        setSelectItem={val => handleWorkloadItem(item, !!val)}
        key={`${item.module}-${item.name}`}
        prefix={`${prefix}/${url}`}
        detail={item}
      />
    );
  }
  return (
    <>
      {deploymentList.length > 0 && (
        <ResourceCard
          key="Deployment"
          title={t('WORKLOAD_PL')}
          data={deploymentList}
          emptyPlaceholder={
            <EmptyTips>{t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('WORKLOAD') })}</EmptyTips>
          }
          itemRender={item => itemRender(item)}
        />
      )}
      {statefulSetList.length > 0 && (
        <ResourceCard
          key="StatefulSet"
          title={t('WORKLOAD_PL')}
          data={statefulSetList}
          emptyPlaceholder={
            <EmptyTips>{t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('WORKLOAD') })}</EmptyTips>
          }
          itemRender={item => itemRender(item)}
        />
      )}
      {daemonsetList.length > 0 && (
        <ResourceCard
          key="DaemonSet"
          title={t('WORKLOAD_PL')}
          data={daemonsetList}
          emptyPlaceholder={
            <EmptyTips>{t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('WORKLOAD') })}</EmptyTips>
          }
          itemRender={item => itemRender(item)}
        />
      )}
    </>
  );
}

export default Workloads;
