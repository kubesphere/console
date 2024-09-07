/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { workloadStore } from '@ks-console/shared';
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Button } from '@kubed/components';
import WorkloadItem from './Item';
import ScrollLoad from '../../../../Base/ScrollLoad';

import { Body, StyledAlert, Workloads, Footer } from './style';

interface IProps {
  cluster?: string;
  namespace?: string;
  onCancel: any;
  onSelect: any;
}

const { fetchList: fetchDeployments } = workloadStore('deployments');
const { fetchList: fetchStatefulSets } = workloadStore('statefulsets');
const { fetchList: fetchDaemonSets } = workloadStore('daemonsets');
const fetchMapper: Record<string, any> = {
  deployments: fetchDeployments,
  statefulsets: fetchStatefulSets,
  daemonsets: fetchDaemonSets,
};

const WorkloadSelect = ({ cluster, namespace, onCancel, onSelect }: IProps) => {
  const [type, setType] = useState('deployments');
  const [list, setList] = useState<{
    data: Record<string, any>[];
    total: number;
    page: number;
    isLoading: boolean;
  }>({
    data: [],
    total: 0,
    page: 1,
    isLoading: false,
  });
  const [selectItem, setSelectItem] = useState<Record<string, any>>();

  const fetchData = async (params?: Record<string, any>) => {
    const { tab = type, more, ...rest } = params || {};
    setList({ ...list, isLoading: true });
    const result = await fetchMapper[tab]({ cluster, namespace, ...rest });
    setList({
      data: more ? [...list.data, ...result.data] : result.data,
      total: result.total,
      page: result.page,
      isLoading: false,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTypeChange = (tab: string) => {
    setType(tab);
    fetchData({ tab });
  };

  const handleSelect = (item: Record<string, any>) => {
    setSelectItem(item);
  };

  const handleCancel = () => {
    setSelectItem({});
    onCancel();
  };

  const handleOK = () => {
    onSelect?.(get(selectItem, '_originData.spec.template.metadata.labels', {}));
  };

  return (
    <div>
      <Body>
        <StyledAlert className="margin-b8" showIcon={false}>
          {t('SELECT_WORKLOAD_DESC')}
        </StyledAlert>
        <Tabs activeKey={type} onTabChange={handleTypeChange}>
          <Tab label={t('DEPLOYMENT_PL')} key="deployments"></Tab>
          <Tab label={t('STATEFULSET_PL')} key="statefulsets"></Tab>
          <Tab label={t('DAEMONSET_PL')} key="daemonsets"></Tab>
        </Tabs>
        <Workloads>
          <ScrollLoad
            data={list.data}
            loading={list.isLoading}
            total={list.total}
            page={list.page}
            onFetch={fetchData}
          >
            {list.data.map((item, index) => (
              <WorkloadItem
                key={`${item.uid}${index}`}
                module={type}
                detail={item}
                onClick={handleSelect}
                selected={selectItem ? selectItem?.uid === item.uid : false}
              />
            ))}
          </ScrollLoad>
        </Workloads>
      </Body>
      <Footer>
        <Button onClick={handleCancel}>{t('CANCEL')}</Button>
        <Button color="secondary" onClick={handleOK}>
          {t('OK')}
        </Button>
      </Footer>
    </div>
  );
};

export default WorkloadSelect;
