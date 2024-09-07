/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { get, isEmpty } from 'lodash';
import { useLocalStorage } from '@kubed/hooks';
import { Tooltip } from '@kubed/components';
import { ChevronDown, Ip, Pod } from '@kubed/icons';
import {
  formatTime,
  hasPermission,
  getAreaChartOps,
  hasClusterModule,
  hideGPUByLicense,
} from '../../utils';
import StatusReason from '../StatusReason';
import ContainerItem from '../Containers/Card';
import TinyArea from '../Charts/TinyArea';
import {
  Charts,
  Indicator,
  IpTip,
  StatusTip,
  MonitorWrapper,
  EntityWrapper,
  EntityMain,
  IndicatorWrapper,
  PodIp,
  ArrowWrapper,
  Extra,
  ExtraContainer,
  FiledWrapper,
} from './styles';

interface Props {
  prefix?: string;
  detail: Record<string, any>;
  metrics?: Record<string, any>;
  loading?: boolean;
  expanded?: boolean;
  onExpand?: (value: string) => void;
}

function PodItem({ prefix = '', detail, metrics, loading, expanded, onExpand }: Props) {
  const [, setPodDetail] = useLocalStorage({ key: 'pod-detail-referrer' });
  const status = useMemo(
    () => ({
      type: detail.podStatus.type.toLowerCase(),
      name: detail.podStatus.status,
    }),
    [detail],
  );

  const isCreating = useMemo(
    () => status.type === 'warning' && status.name === 'ContainerCreating',
    [status],
  );

  const isRunning = useMemo(
    () => status.type === 'running' || status.name === 'completed',
    [status],
  );

  const networkIPs = useMemo(() => {
    const { networksStatus } = detail;

    return networksStatus.reduce(
      (prev: any, cur: any) => (cur.ips ? [...prev, ...cur.ips] : [...prev]),
      [],
    );
  }, [detail]);

  const containerStatus = useMemo(() => {
    const containerStatuses = get(detail, 'status.containerStatuses') || [];

    let readyCount = 0;

    containerStatuses.forEach((item: any) => {
      if (item.ready) {
        readyCount += 1;
      }
    });

    return {
      readyCount,
      total: containerStatuses.length,
    };
  }, [detail]);

  const updateStatus = useMemo(() => {
    if (!isRunning) {
      return (
        <StatusReason status={status.type} data={detail} reason={status.name} type="pod" hasTip />
      );
    }

    return (
      <span>
        {t('CREATED_TIME', {
          diff: formatTime(detail.createTime, 'YYYY-MM-DD HH:mm:ss'),
        })}
      </span>
    );
  }, [isRunning, detail, status]);

  const link = useMemo(
    () => `${prefix}/projects/${detail.namespace}/pods/${detail.name}`,
    [prefix, detail],
  );

  const monitoringCfgs = useMemo(
    () =>
      hideGPUByLicense(
        [
          {
            type: 'cpu',
            title: 'CPU',
            unitType: 'cpu',
            legend: ['USED'],
            data: [metrics?.cpu],
            bgColor: 'transparent',
          },
          {
            type: 'memory',
            title: 'MEMORY',
            unitType: 'memory',
            legend: ['USED'],
            data: [metrics?.memory],
            bgColor: 'transparent',
          },
          {
            type: 'gpu',
            title: 'GPU',
            unitType: 'gpu',
            legend: ['USED'],
            data: [metrics?.gpu],
            bgColor: 'transparent',
          },
          {
            type: 'gpu_memory',
            title: 'GPU_MEMORY',
            unitType: 'memory',
            legend: ['USED'],
            data: [metrics?.gpu_memory],
            bgColor: 'transparent',
          },
        ],
        detail.cluster,
      ),
    [metrics],
  );

  const nodeContent = useMemo(() => {
    const { cluster, node, nodeIp } = detail;
    const nodePermission = hasPermission({
      cluster,
      module: 'nodes',
      action: 'view',
    });

    if (!node) return '-';

    const text = t('NODE_IP', { node, ip: nodeIp });

    return nodePermission ? <Link to={`/clusters/${cluster}/nodes/${node}`}>{text}</Link> : text;
  }, [detail]);

  const handleExpandExtra = () => {
    onExpand?.(detail.uid);
  };

  const handleLinkClick = () => {
    setPodDetail(location.pathname);
  };

  const statusTip = useMemo(() => {
    const { name } = detail;
    const { name: statusStr } = status;
    const { readyCount, total } = containerStatus;

    return (
      <Tooltip
        content={
          <StatusTip>
            <strong>{name}</strong>
            <p>{t('READY_VALUE', { readyCount, total })}</p>
            <p>{t('STATUS_VALUE', { value: t(statusStr) })}</p>
          </StatusTip>
        }
      >
        <Indicator type={status.type} motion />
      </Tooltip>
    );
  }, [detail, status, containerStatus]);

  const podIpContent = useMemo(() => {
    return (
      <IpTip>
        <div>{t('POD_IP_ADDRESS')}</div>
        <ul>
          {networkIPs.map((item: string) => (
            <li key={item}>
              <Ip size={20} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </IpTip>
    );
  }, [networkIPs]);

  const monitorings = useMemo(() => {
    if (!hasClusterModule(detail.cluster, 'whizard-monitoring')) {
      return null;
    }
    if (loading) return <MonitorWrapper expanded={expanded}>{t('LOADING')}</MonitorWrapper>;

    if (isEmpty(metrics?.cpu) && isEmpty(metrics?.memory))
      return <MonitorWrapper expanded={expanded}>{t('NO_MONITORING_DATA')}</MonitorWrapper>;

    return (
      <MonitorWrapper expanded={expanded}>
        <Charts>
          {monitoringCfgs.map((item: any) => {
            const config = getAreaChartOps(item);
            return (
              <TinyArea
                {...config}
                margin={{ top: 30, left: 0, right: 0, bottom: 0 }}
                categories={['USED']}
                dataKey="time"
                key={item.type}
                width="50%"
                height={40}
                showTooltip
                darkMode={expanded}
                legendFormatter={l => t(l.dataKey)}
                valueFormatter={v => `${v} ${config.unit}`}
              />
            );
          })}
        </Charts>
      </MonitorWrapper>
    );
  }, [loading, metrics, expanded, monitoringCfgs]);

  return (
    <EntityWrapper>
      <EntityMain
        expandable
        onClick={handleExpandExtra}
        expandProps={{
          animation: false,
        }}
        expandContent={
          <Extra onClick={e => e.stopPropagation()}>
            <div className="title">
              <strong>{t('CONTAINER_PL')}</strong>
            </div>
            <ExtraContainer>
              {detail.containers.map((container: any) => (
                <ContainerItem
                  key={container.name}
                  prefix={prefix ? link : ''}
                  podName={detail.name}
                  detail={container}
                  cluster={detail.cluster}
                  onContainerClick={handleLinkClick}
                  isCreating={isCreating}
                />
              ))}
              {detail.initContainers.map((container: any) => (
                <ContainerItem
                  key={container.name}
                  prefix={prefix ? link : ''}
                  podName={detail.name}
                  detail={container}
                  cluster={detail.cluster}
                  onContainerClick={handleLinkClick}
                  isCreating={isCreating}
                  isInit
                />
              ))}
            </ExtraContainer>
          </Extra>
        }
      >
        <FiledWrapper
          width="25%"
          avatar={
            <IndicatorWrapper>
              <Pod size={40} />
              {statusTip}
            </IndicatorWrapper>
          }
          label={updateStatus}
          value={
            <Tooltip content={detail.name}>
              {prefix ? (
                <Link to={link}>{<span onClick={handleLinkClick}>{detail.name}</span>}</Link>
              ) : (
                <span>{detail.name}</span>
              )}
            </Tooltip>
          }
        />
        {!(location.pathname.indexOf('/nodes') !== -1) && (
          <FiledWrapper width="20%" label={t('NODE')} value={nodeContent} />
        )}
        <FiledWrapper
          width="15%"
          label={t('POD_IP_ADDRESS_SCAP')}
          value={
            <div>
              <span>{detail.podIp || '-'}</span>
              {!isEmpty(networkIPs) && networkIPs.length > 1 && (
                <Tooltip content={podIpContent}>
                  <PodIp>{networkIPs.length}</PodIp>
                </Tooltip>
              )}
            </div>
          }
        />
        {monitorings}
        <ArrowWrapper expanded={expanded}>
          <ChevronDown />
        </ArrowWrapper>
      </EntityMain>
    </EntityWrapper>
  );
}

export default PodItem;
