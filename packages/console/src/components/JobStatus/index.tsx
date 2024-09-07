/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { StatusIndicator, getWorkloadStatus } from '@ks-console/shared';

import type { WorkloadStatusProps } from '../WorkloadStatus';

const JobStatus = ({ record, module }: WorkloadStatusProps) => {
  const { status } = getWorkloadStatus(record, module);
  const type = status === 'Running' ? 'JobRunning' : status;

  return <StatusIndicator type={type as any}>{t(status)}</StatusIndicator>;
};

export default JobStatus;
