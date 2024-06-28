import React from 'react';
import { Tag } from '@kubed/components';
import { ProbeItem, ProbeTime, ProbeType } from '../../styles';

// TODO: type
interface Props {
  [key: string]: any;
}

function ProbeRecord({ probe, title, tagType, noTime = false }: Props) {
  if (!probe) return null;

  const delay = probe.initialDelaySeconds || 0;
  const timeout = probe.timeoutSeconds || 0;
  let probeType;
  let probeDetail;

  if ('httpGet' in probe) {
    const { path, port, scheme } = probe.httpGet;
    probeType = 'HTTP_REQUEST';
    probeDetail = `GET ${path} on port ${port} (${scheme})`;
  } else if ('tcpSocket' in probe) {
    probeType = 'TCP_PORT';
    probeDetail = `Open socket on port ${probe.tcpSocket.port} (TCP)`;
  } else {
    const { command = [] } = probe.exec;
    probeType = 'COMMAND';
    probeDetail = command.join(' ');
  }

  return (
    <ProbeItem>
      <div>
        <Tag color={tagType}>{title}</Tag>
        <ProbeType>{t(probeType)}</ProbeType>
        <br />
        {!noTime && <ProbeTime>{t('INITIAL_DELAY_TIMEOUT_VALUE', { delay, timeout })}</ProbeTime>}
      </div>
      <p>{probeDetail}</p>
    </ProbeItem>
  );
}

export default ProbeRecord;
