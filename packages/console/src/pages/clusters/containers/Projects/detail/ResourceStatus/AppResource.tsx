/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Constants, getAreaChartOps, Icon, PathParams } from '@ks-console/shared';
import { AreaChart } from '@kubed/charts';
import { LoadingOverlay } from '@kubed/components';
import { get } from 'lodash';
import * as React from 'react';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryProjectMonitor } from '../../../../stores/monitor/projectMonitor';
import { useQueryProjectQuotaAndStatus } from '../../../../stores/project';
import {
  AppWrapper,
  Badge,
  Item,
  ItemChart,
  ItemContent,
  ItemDesc,
  ItemIcon,
  ItemTitle,
  Tips,
} from './styles';

const APP_RESOURCE_METRIC_TYPES = [
  'namespace_pod_count',
  'namespace_deployment_count',
  'namespace_statefulset_count',
  'namespace_daemonset_count',
  'namespace_job_count',
  'namespace_cronjob_count',
  'namespace_pvc_count',
  'namespace_service_count',
  'namespace_secret_count',
  'namespace_configmap_count',
  'namespace_ingresses_extensions_count',
  'namespace_s2ibuilder_count',
];

const { ICON_TYPES } = Constants;

const getResourceData = (
  data: Record<string, any>,
  quota: Record<string, any>,
  { data: status = {} }: Record<string, any>,
) => {
  const used = quota?.data?.used ?? {};
  return [
    {
      key: 'pods',
      icon: ICON_TYPES.pods,
      name: 'POD',
      routeName: 'pods',
      num: used['count/pods'],
      warnNum: status.pods,
      metric: 'namespace_pod_count',
    },
    {
      key: 'deployments',
      icon: ICON_TYPES.deployments,
      name: 'DEPLOYMENT',
      routeName: 'deployments',
      num: used['count/deployments.apps'],
      warnNum: status.deployments,
      metric: 'namespace_deployment_count',
    },
    {
      key: 'statefulsets',
      icon: ICON_TYPES.statefulsets,
      name: 'STATEFULSET',
      routeName: 'statefulsets',
      num: used['count/statefulsets.apps'],
      warnNum: status.statefulsets,
      metric: 'namespace_statefulset_count',
    },
    {
      key: 'daemonsets',
      icon: ICON_TYPES.daemonsets,
      name: 'DAEMONSET',
      routeName: 'daemonsets',
      num: used['count/daemonsets.apps'],
      warnNum: status.daemonsets,
      metric: 'namespace_daemonset_count',
    },
    {
      key: 'jobs',
      icon: ICON_TYPES.jobs,
      name: 'JOB',
      routeName: 'jobs',
      num: used['count/jobs.batch'],
      metric: 'namespace_job_count',
    },
    {
      key: 'cronjobs',
      icon: ICON_TYPES.cronjobs,
      name: 'CRONJOB',
      routeName: 'cronjobs',
      num: used['count/cronjobs.batch'],
      metric: 'namespace_cronjob_count',
    },
    {
      key: 'volumes',
      icon: ICON_TYPES.volumes,
      name: 'PERSISTENT_VOLUME_CLAIM',
      routeName: 'volumes',
      num: used.persistentvolumeclaims || used['count/persistentvolumeclaims'],
      warnNum: status['persistent-volume-claims'],
      metric: 'namespace_pvc_count',
    },
    {
      key: 'services',
      icon: ICON_TYPES.services,
      name: 'SERVICE',
      routeName: 'services',
      num: used['count/services'],
      metric: 'namespace_service_count',
    },
    {
      key: 'routes',
      icon: ICON_TYPES.ingresses,
      name: 'ROUTE',
      routeName: 'ingresses',
      num: used['count/ingresses.extensions'],
      metric: 'namespace_ingresses_extensions_count',
    },
  ];
};

export interface IAppResource {
  params: PathParams;
  time: number;
  isObservability?: boolean;
  hasMonitoring?: boolean;
}

const AppResource = (props: IAppResource) => {
  const { params, time, hasMonitoring = true } = props;
  const { cluster, namespace, workspace } = params;
  const navigate = useNavigate();
  const [{ data: appQuota }, { data: appStatus }] = useQueryProjectQuotaAndStatus(params);

  const { data: appData, isFetching } = useQueryProjectMonitor(
    {
      ...params,
      metrics: APP_RESOURCE_METRIC_TYPES,
      step: `${Math.floor(time / 10)}s`,
      times: 10,
      fillZero: time,
      autoRefresh: false,
    },
    {
      refetchInterval: 10 * 1000,
      enabled: hasMonitoring,
    },
  );

  const appResource = React.useMemo(
    () => getResourceData(appData ?? {}, appQuota ?? {}, appStatus ?? {}),
    [appData, appQuota, appStatus],
  );

  const handleWarnClick = (e: MouseEvent, item: Record<string, any>) => {
    e.stopPropagation();

    const { isObservability } = props;
    const { routeName } = item;
    const status = routeName === 'volumes' ? 'pending' : 'updating';

    if (routeName) {
      navigate(
        isObservability
          ? `/whizard-telemetry/${cluster}/projects/${namespace}/${routeName}?status=${status}`
          : workspace
            ? `/${workspace}/clusters/${cluster}/projects/${namespace}/${routeName}?status=${status}`
            : `/clusters/${cluster}/${routeName}?status=${status}`,
      );
    }
  };
  const renderWarn = (item: Record<string, any>) => {
    const { warnNum, name } = item;
    const warnText = warnNum > 99 ? <div>...</div> : warnNum;

    if (warnNum > 0) {
      return (
        <Tips
          content={t('RESOURCE_WARNING_TIPS', {
            warnNum,
            tipName: t(`${name}_PL`),
          })}
        >
          <Badge onClick={e => handleWarnClick(e, item)}>{warnText}</Badge>
        </Tips>
      );
    }
    return null;
  };

  return (
    <AppWrapper>
      <LoadingOverlay visible={isFetching} />
      {appResource
        // .filter(item => !item.disabled)
        .map(item => {
          const { key: module, num, icon, name, metric } = item;
          const config = hasMonitoring
            ? getAreaChartOps({
                title: '',
                unit: '',
                legend: ['COUNT'],
                data: get(appData, `${metric}.data.result`),
              } as any)
            : undefined;
          return (
            <Item key={module}>
              <ItemIcon>
                <Icon name={icon} size={40} />
                {renderWarn(item)}
              </ItemIcon>
              <ItemContent to={`/clusters/${cluster}/${module}?namespace=${namespace}`}>
                <ItemTitle>{num}</ItemTitle>
                <ItemDesc>{t(`${name}_PL`)}</ItemDesc>
              </ItemContent>
              {hasMonitoring && (
                <ItemChart>
                  <AreaChart
                    {...config}
                    // TODO: support CartesianGrid vertical
                    // TODO: support Area dot
                    categories={['COUNT']}
                    dataKey="time"
                    // width={'100%'}
                    showGridLines={false}
                    showXAxis={false}
                    showYAxis={false}
                    showLegend={false}
                    showGradient={false}
                    showTooltip={!!config?.data.length}
                    height={40}
                  />
                </ItemChart>
              )}
            </Item>
          );
        })}
    </AppWrapper>
  );
};

export default AppResource;
