/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useQuery } from 'react-query';

import {
  getChartData,
  getSuitableUnit,
  getValueByUnit,
  getLastMonitoringData,
  getAreaChartOps,
  monitorStore,
  CustomTooltip,
  Panel,
  VolumeStatus,
} from '@ks-console/shared';

import { get, isEmpty } from 'lodash';
import { Alert, Loading } from '@kubed/components';
import { HeaderStyle, CardStyled, DescriptionStyled, ChartContainerStyle } from './styles';
import { AreaChart } from '@kubed/charts';
import { useParams } from 'react-router-dom';

const { useMonitorStore, apiVersion } = monitorStore;

const METRICS = {
  inodeUsage: 'pvc_inodes_used',
  inodeTotal: 'pvc_inodes_total',
  inodeUtilisation: 'pvc_inodes_utilisation',
  capacityAvailable: 'pvc_bytes_available',
  capacityTotal: 'pvc_bytes_total',
  capacityUtilisation: 'pvc_bytes_utilisation',
};

interface IPropsType<T> {
  title?: string;
  detail?: T;
}

// const UPDATE_INTERVAL = 60000;

const UsageCard = <T extends Record<string, any>>({ title }: IPropsType<T>) => {
  const isLoading = false;
  const isRefreshing = false;
  const { cluster, namespace, name } = useParams();

  const getApiFn = () => `${apiVersion({ cluster, namespace, persistentvolumeclaim: name })}`;
  const { fetchMetrics } = useMonitorStore({ getApiFn });

  const { data: monitorData } = useQuery(['monitor'], () =>
    fetchMetrics({
      resources: [],
      pvc: name,
      metrics: Object.values(METRICS),
      step: '1m',
      times: 60,
      cluster,
    }),
  );

  //   const htmlMes = t.html('VOLUME_MONITORING_TIP');

  const parseMetrics = (value: any, type: string) => {
    const unit = getSuitableUnit(value, type);
    const count = getValueByUnit(value, unit);
    return { unit, count };
  };

  const renderMonitor = () => {
    if (isEmpty(monitorData)) {
      return null;
    }

    const usageRate = get(monitorData, `${METRICS.inodeUtilisation}.data.result`);
    const usage = get(monitorData, `${METRICS.inodeUsage}.data.result[0].values`, []);
    const total = get(monitorData, `${METRICS.inodeTotal}.data.result[0].values`, []);

    const config = getAreaChartOps({
      title: t('INODE_USAGE'),
      unit: '%',
      legend: [t('USAGE')],
      data: usageRate,
      type: '',
      renderTooltip: (payload: any[]) => {
        const usageData = getChartData({
          unit: '',
          legend: ['USAGE'],
          valuesData: [usage],
          type: '',
        });

        const totalData = getChartData({
          unit: '',
          legend: ['USAGE'],
          valuesData: [total],
          type: '',
        });

        return (
          <CustomTooltip usageData={usageData} totalData={totalData} payload={payload} unit={'%'} />
        );
      },
    });
    return <AreaChart {...config} categories={[t('USAGE')]} dataKey="time" />;
  };

  const renderStatus = () => {
    const data = monitorData;
    const status = getLastMonitoringData(data);

    const capacityAvailable = get(status, `${METRICS.capacityAvailable}.value[1]`, 0);

    const capacityTotal = get(status, `${METRICS.capacityTotal}.value[1]`, 0) + '';

    const available = parseMetrics(capacityAvailable, 'memory');
    const total = parseMetrics(capacityTotal, 'memory');

    const currentUsageRate = get(status, `${METRICS.capacityUtilisation}.value[1]`, 0);

    return (
      <HeaderStyle>
        <CardStyled>
          <VolumeStatus rate={Number(currentUsageRate)} />
        </CardStyled>
        <DescriptionStyled>
          <h3>
            {available.count}
            <small>{available.unit}</small>
          </h3>
          <p>{t('AVAILABLE_CAPACITY')}</p>
        </DescriptionStyled>
        <DescriptionStyled>
          <h3>
            {total.count}
            <small>{total.unit}</small>
          </h3>
          <p>{t('TOTAL_CAPACITY')}</p>
        </DescriptionStyled>
      </HeaderStyle>
    );
  };

  return (
    <Panel title={title}>
      {isLoading ? (
        <Loading className="page-loading"></Loading>
      ) : (
        <div data-refreshing={isRefreshing}>
          <Alert type="warning" className="mb12">
            <span dangerouslySetInnerHTML={{ __html: t('VOLUME_MONITORING_TIP') }}></span>
          </Alert>
          {renderStatus()}
          <ChartContainerStyle>{renderMonitor()}</ChartContainerStyle>
        </div>
      )}
    </Panel>
  );
};

export default UsageCard;
