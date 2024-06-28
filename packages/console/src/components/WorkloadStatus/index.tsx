import React from 'react';
import { TimedTask } from '@kubed/icons';
import { getWorkloadStatus, StatusIndicator } from '@ks-console/shared';
import { get, isEmpty } from 'lodash';
import { Tooltip } from '@kubed/components';

export interface WorkloadStatusProps {
  record: any;
  module: string;
}

export const S2I_STATUS_DESC: Record<string, string> = {
  Failed: 'IMAGE_BUILDING_FAILED',
  Running: 'BUILDING_IMAGE',
  Successful: 'IMAGE_BUILDING_SUCCESSFUL',
};

const WorkloadStatus = ({ record, module }: WorkloadStatusProps) => {
  const { status } = getWorkloadStatus(record, module) || '';

  if (status.startsWith('S2I')) {
    const S2iStatus: string = status.slice(4);

    return (
      <StatusIndicator type={S2iStatus as any}>{t(S2I_STATUS_DESC[S2iStatus])}</StatusIndicator>
    );
  }

  if (module === 'daemonsets') {
    const ready = get(record, 'status.numberAvailable', 0);
    const total = get(record, 'status.desiredNumberScheduled', 0);

    return (
      <StatusIndicator type={status as any} ready={ready} total={total}>
        {t(status.toUpperCase())}
      </StatusIndicator>
    );
  }

  return (
    <>
      <StatusIndicator type={status as any} ready={record.readyPodNums} total={record.podNums}>
        {t(status.toUpperCase())}
      </StatusIndicator>
      {!isEmpty(get(record, 'annotations["kubesphere.io/relatedHPA"]')) && (
        <Tooltip content={t('HPA_SET_TIP')} trigger="hover">
          <TimedTask />
        </Tooltip>
      )}
    </>
  );
};

export default WorkloadStatus;
