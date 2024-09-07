/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useRef, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { useMutation } from 'react-query';
import { Button, FormInstance, FormItem, Select } from '@kubed/components';
import { Cluster } from '@kubed/icons';
import {
  Chart,
  Content,
  Empty,
  ItemIcon,
  StyledForm,
  TableBox,
  TableTitle,
  TableWrapper,
} from './style';
import { Column } from '../../DataTable';
import BaseTable from '../../Base/Table';
import { clusterMonitorStore, workspaceStore } from '../../../stores';
import { FormattedStatistics, OriginalStatisticsMetricResult } from '../../../types';
import { formatTime, getSuitableValue, getAreaChartOps } from '../../../utils';
import { MonitorControllerModal } from '../../Base';
import NamespaceSelector from '../../Selectors/NamespaceSelector';
import { SimpleArea } from '../../Charts';

interface Props {
  visible?: boolean;
  detail: any;
  onCancel?: () => void;
  workspace?: string;
  cluster?: string;
}

type FormValues = {
  cluster?: string;
  namespace: string;
};

const MonitorOptions = {
  times: 100,
  step: '5m',
};

const { fetchApplicationResourceMetrics } = clusterMonitorStore;
const { useFetchWorkspaceClustersQuery } = workspaceStore;

function ResourceMonitorModal({ visible, detail, cluster, workspace, onCancel }: Props) {
  const [metricsParams, setMetricsParams] = useState({
    cluster,
    workspace,
    namespace: get(detail, 'namespace', 'all'),
    ...MonitorOptions,
  });
  const [metricsData, setMetricsData] = useState<{
    originData?: FormattedStatistics;
    data?: OriginalStatisticsMetricResult[];
  }>({});
  const formRef = useRef<FormInstance<FormValues>>();

  const metricType = detail?.metricType;

  const { mutate, isLoading } = useMutation(
    (fetchParams?: any) => {
      return fetchApplicationResourceMetrics({
        metrics: [metricType],
        originData: metricsData?.originData || {},
        ...metricsParams,
        ...fetchParams,
      });
    },
    {
      onSuccess: data => {
        setMetricsData(data);
      },
    },
  );

  const { formattedClusters = [] } = useFetchWorkspaceClustersQuery({
    workspace,
  });

  const clusters = useMemo(
    () =>
      formattedClusters.map(item => ({
        label: item.name,
        value: item.name,
        cluster: item,
        disabled: !item.isReady,
      })),
    [formattedClusters],
  );
  const metrics = useMemo(() => metricsData.data, [metricsData]);
  const handleFormSubmit = (data: any) => {
    setMetricsParams({
      ...metricsParams,
      ...data,
    });
    mutate({});
  };

  const filterForm = (
    <StyledForm ref={formRef} initialValues={metricsParams} onFinish={handleFormSubmit}>
      {workspace && (
        <FormItem label={t('CLUSTER')} name="cluster">
          {({ value, onChange }) => {
            return (
              <Select
                options={clusters}
                value={value}
                onChange={(newValue: string) => {
                  onChange(newValue);
                  setMetricsParams({
                    ...metricsParams,
                    cluster: newValue,
                  });
                }}
              >
                {clusters.map(item => (
                  <Select.Option key={item.value} value={item.value}>
                    <ItemIcon>
                      <Cluster size={16} />
                      <span>{item.label}</span>
                    </ItemIcon>
                  </Select.Option>
                ))}
              </Select>
            );
          }}
        </FormItem>
      )}
      <FormItem label={t('PROJECT')} name="namespace">
        <NamespaceSelector cluster={metricsParams.cluster || ''} workspace={workspace} />
      </FormItem>
      <Button
        variant="filled"
        color="secondary"
        shadow
        radius="xl"
        onClick={() => formRef.current?.submit()}
      >
        {t('OK')}
      </Button>
    </StyledForm>
  );

  const renderChart = () => {
    const data = {
      ...detail,
      data: metrics,
    };
    const configs = getAreaChartOps(data);
    return (
      <Chart>
        {isEmpty(configs.data) ? (
          <Empty>
            <img src="/assets/empty-card.svg" />
          </Empty>
        ) : (
          <SimpleArea
            categories={Object.keys(configs.data[0] || {}).filter(key => key !== 'time')}
            height="100%"
            theme="light"
            {...configs}
          />
        )}
      </Chart>
    );
  };

  const handleCancel = () => {
    setMetricsParams({
      ...metricsParams,
      ...MonitorOptions,
    });
    onCancel?.();
  };

  const renderTable = () => {
    const { title, unitType, unit } = detail;
    const data = get(metrics, '[0].values') || [];
    const records = [...data].reverse().map((record: any) => ({
      time: get(record, '[0]', 0) * 1000,
      value: getSuitableValue(get(record, '[1]', 0), unitType || unit),
    }));
    const columns: Column[] = [
      {
        field: 'time',
        title: t('TIME'),
        width: '30%',
        render: time => formatTime(time),
      },
      {
        title: t('USAGE'),
        field: 'value',
      },
    ];

    return (
      <TableWrapper>
        <TableBox>
          <TableTitle>{t(title) || t('RESOURCE_USAGE')}</TableTitle>
          <BaseTable columns={columns} dataSource={records} />
        </TableBox>
      </TableWrapper>
    );
  };

  if (!visible) return null;

  return (
    <MonitorControllerModal
      visible={visible}
      onFetch={mutate}
      onCancel={handleCancel}
      loading={isLoading}
      times={metricsParams.times}
      step={metricsParams.step}
      updateMonitorOptions={({ times, step }) => {
        setMetricsParams({
          ...metricsParams,
          times,
          step,
        });
      }}
    >
      <Content>
        {filterForm}
        {renderChart()}
        {renderTable()}
      </Content>
    </MonitorControllerModal>
  );
}

export default ResourceMonitorModal;
