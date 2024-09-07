/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isEmpty, isUndefined } from 'lodash';
import { Tooltip } from '@kubed/components';
import { Docker, Log, Terminal } from '@kubed/icons';
import { useCacheStore as useStore } from '../../../index';
import { createCenterWindowOpt, getContainerStatus, hasPermission } from '../../../utils';
import ProbeRecord from '../Components/ProbeRecord';
import {
  IconWrapper,
  Indicator,
  ItemWrapper,
  NoLink,
  Text,
  TextName,
  NameTag,
  TooltipWrapper,
} from '../styles';
import ContainerLog from '../Log';
import { FullScreenModal } from './styles';

interface Props {
  prefix?: string;
  detail: Record<string, any>;
  podName?: string;
  cluster?: string;
  isInit?: boolean;
  isCreating?: boolean;
  hideTerminal?: boolean;
  onContainerClick?: () => void;
}

function ContainerItem({
  prefix = '',
  detail,
  podName,
  cluster,
  isInit,
  isCreating,
  hideTerminal,
  onContainerClick,
}: Props) {
  const [containerLogVisible, setContainerLogVisible] = useState<boolean>(false);
  const gatewayDetail = useStore('gatewayDetail');
  const params = useParams();
  const canViewTerminal = useMemo(() => {
    const { namespace } = detail;
    return (
      !hideTerminal &&
      hasPermission({
        module: 'pods',
        project: namespace,
        action: 'edit',
        cluster,
      })
    );
  }, [detail, cluster]);
  const link = useMemo(() => `${prefix}/containers/${detail.name}`, [detail, prefix]);
  const handleOpenTerminal = () => {
    const { namespace, name } = detail;
    const terminalUrl = `/terminal/cluster/${cluster}/projects/${namespace}/pods/${podName}/containers/${name}`;

    window.open(
      terminalUrl,
      `Connecting ${name}`,
      createCenterWindowOpt({
        width: 1200,
        height: 800,
        scrollbars: 1,
        resizable: 1,
      }),
    );
  };
  const { status, reason } = getContainerStatus(detail);
  const hasProbe = detail.livenessProbe || detail.readinessProbe || detail.startupProbe;
  const hasLife = detail.lifecycle && !isEmpty(detail.lifecycle);

  const probe = useMemo(() => {
    const { livenessProbe, readinessProbe, startupProbe } = detail || {};

    if (!livenessProbe && !readinessProbe && !startupProbe) return null;

    return (
      <div>
        <ProbeRecord probe={readinessProbe} title={t('READINESS_PROBE')} tagType="primary" />
        <ProbeRecord probe={livenessProbe} title={t('LIVENESS_PROBE')} tagType="warning" />
        <ProbeRecord probe={startupProbe} title={t('STARTUP_PROBE')} tagType="info" />
      </div>
    );
  }, [detail]);

  const life = useMemo(() => {
    const { lifecycle } = detail;
    const { preStop, postStart } = lifecycle || {};

    if (!lifecycle) return null;

    return (
      <div>
        <ProbeRecord probe={postStart} title={t('POSTSTART_ACTION')} tagType="primary" noTime />
        <ProbeRecord probe={preStop} title={t('PRESTOP_ACTION')} tagType="warning" noTime />
      </div>
    );
  }, [detail]);

  return (
    <ItemWrapper>
      <IconWrapper>
        <Docker size={40} />
        {!isUndefined(detail.ready) && <Indicator type={status as any} motion />}
      </IconWrapper>
      <TextName>
        <div>
          {prefix && status !== 'terminated' ? (
            <Link to={link}>
              <span onClick={onContainerClick}>{detail.name}</span>
            </Link>
          ) : (
            <NoLink>{detail.name}</NoLink>
          )}
          {prefix && !isCreating && (
            <Tooltip
              maxWidth={300}
              content={<TooltipWrapper>{t('CONTAINER_LOGS')}</TooltipWrapper>}
            >
              <Log
                size={16}
                onClick={e => {
                  e.stopPropagation();
                  setContainerLogVisible(true);
                }}
              />
            </Tooltip>
          )}
          {status === 'running' && prefix && canViewTerminal && (
            <Tooltip maxWidth={300} content={<TooltipWrapper>{t('TERMINAL')}</TooltipWrapper>}>
              <Terminal
                size={16}
                onClick={e => {
                  e.stopPropagation();
                  handleOpenTerminal();
                }}
              />
            </Tooltip>
          )}
          {isInit && <NameTag color="warning">{t('INIT_CONTAINER')}</NameTag>}
          {hasProbe && (
            <Tooltip maxWidth={300} content={<TooltipWrapper>{probe}</TooltipWrapper>}>
              <NameTag>{t('PROBE_PL')}</NameTag>
            </Tooltip>
          )}
          {hasLife && (
            <Tooltip maxWidth={300} content={<TooltipWrapper>{life}</TooltipWrapper>}>
              {/* TODO Tag support string  */}
              <NameTag>{t('HOOK_PL')}</NameTag>
            </Tooltip>
          )}
        </div>
        {reason ? (
          <p>{t(reason)}</p>
        ) : (
          <p>{t('IMAGE_VALUE', { value: detail.image, interpolation: { escapeValue: false } })}</p>
        )}
      </TextName>
      <Text>
        <div>{isUndefined(status) ? '-' : t(status.toUpperCase())}</div>
        <p>{t('STATUS')}</p>
      </Text>
      <Text>
        <div>{isUndefined(detail.restartCount) ? '-' : detail.restartCount}</div>
        <p>
          {!isUndefined(detail.restartCount) && detail.restartCount === 1
            ? t('RESTART')
            : t('RESTART_PL')}
        </p>
      </Text>
      <Text>
        <div>
          {isEmpty(detail.ports)
            ? '-'
            : detail.ports.map((port: any) => `${port.containerPort}/${port.protocol}`).join(', ')}
        </div>
        <p>{!isEmpty(detail.ports) && detail.ports.length === 1 ? t('PORT') : t('PORT_PL')}</p>
      </Text>
      <FullScreenModal
        zIndex={10000}
        width="calc(100vw - 40px)"
        title={t('CONTAINER_LOGS')}
        visible={containerLogVisible}
        onCancel={() => setContainerLogVisible(false)}
      >
        <ContainerLog
          namespace={detail.namespace}
          podName={podName}
          cluster={cluster}
          containerName={detail.name}
          gatewayName={gatewayDetail?.[0]?.detail?.name}
          gatewayNamespace={params.namespace}
        />
      </FullScreenModal>
    </ItemWrapper>
  );
}

export default ContainerItem;
