/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Checkbox } from '@kubed/components';
import deploymentStore from '../../../../../../stores/workload/deployment';
import { useV3action, useCacheStore as useStore } from '../../../../../../hooks';

import EdgeItem, { Detail } from './Item';
import ResourceCard from '../ResourceCard';
import type { AppDetail } from '../../../../../../types';
import { DeleteBtn, EmptyTips, SelectAll } from '../styles';

type Props = {
  prefix?: string;
  detail: any[];
  appDetail: AppDetail;
};

const store = deploymentStore();

function Workloads({ detail, appDetail }: Props): JSX.Element {
  const { metadata } = appDetail;
  const {
    cluster = metadata?.labels?.['kubesphere.io/cluster'],
    namespace = metadata?.labels?.['kubesphere.io/namespace'],
  } = useParams();
  const prefix = `/v2/edgewize/clusters/${cluster}/projects/${namespace}`;
  const [, setHasEdgeDeployments] = useStore<boolean>('hasEdgeDeployments');
  const [selectItem, setSelectItem] = useState<any[]>([]);
  const [edgeData, setEdgeData] = useState<any[]>([]);
  const { open, render } = useV3action();
  const list = detail.map(item => ({
    ...item,
    module: item.kind,
    ...item.metadata,
  }));

  useEffect(() => {
    if (!list) return;
    store
      .fetchList({
        cluster,
        namespace,
        labelSelector: `apps.edgewize.io/appset=${detail?.[0]?.metadata.name}`,
      })
      .then(res => {
        setEdgeData(res.data);
        setHasEdgeDeployments(!!res.data.length);
      });
  }, []);

  function handleWorkloadItem(item: Detail, check: boolean) {
    const val = selectItem?.filter(workload => workload.name !== item.name);
    if (check) {
      val.push(item);
    }
    setSelectItem(val);
  }

  function handleSelectAll(e: any) {
    const checked = e.target.checked;
    if (checked) {
      setSelectItem(edgeData);
    } else {
      setSelectItem([]);
    }
  }

  function handleDeleteWorkload() {
    if (selectItem?.length) {
      open({
        action: 'workload.batch.delete.v2',
        v3Module: 'workload',
        v3StoreParams: 'deployments',
        type: 'DEPLOYMENT',
        resource: selectItem,
        success: () => {
          const key = selectItem?.map(item => item.name);
          const arr = edgeData.filter(item => !key.includes(item.name));
          setEdgeData(arr);
          setHasEdgeDeployments(!!arr.length);
        },
      });
    }
  }

  function renderTop() {
    if (!edgeData.length) {
      return null;
    }
    return (
      <SelectAll>
        <Checkbox checked={edgeData?.length === selectItem?.length} onChange={handleSelectAll} />
        <DeleteBtn color="error" disabled={!selectItem?.length} onClick={handleDeleteWorkload}>
          {t('DELETE')}
        </DeleteBtn>
      </SelectAll>
    );
  }

  function itemRender(item: any) {
    return (
      <EdgeItem
        showSelect={!!edgeData.length}
        selectItem={selectItem?.find(select => select.name === item.name)}
        setSelectItem={val => handleWorkloadItem(item, !!val)}
        key={`${item.module}-${item.name}`}
        prefix={`${prefix}/deployments`}
        detail={item}
      />
    );
  }
  return (
    <>
      <ResourceCard
        key="WORKLOAD_PL"
        title={t('WORKLOAD_PL')}
        renderTop={renderTop()}
        data={edgeData.length ? edgeData : list}
        emptyPlaceholder={
          <EmptyTips>{t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('WORKLOAD') })}</EmptyTips>
        }
        itemRender={item => itemRender(item)}
      />
      {render?.()}
    </>
  );
}

export default Workloads;
