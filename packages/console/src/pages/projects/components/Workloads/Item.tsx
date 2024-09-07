/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Field } from '@kubed/components';
import {
  formatTime,
  getDisplayName,
  getWorkloadStatus,
  Icon,
  StatusReason,
} from '@ks-console/shared';

import WorkloadStatus from '../../../../components/WorkloadStatus';

import { ItemWrapper } from './styles';

type Props = {
  detail: any;
  prefix?: string;
};

const ICON_TYPES: Record<string, string> = {
  deployments: 'backup',
  daemonsets: 'deamon-set',
  statefulsets: 'stateful-set',
};

function getDescription(detail: any) {
  const { status, reason } = getWorkloadStatus(detail, detail.module);

  if (reason) {
    return <StatusReason status={status} reason={t(reason)} data={detail} hasTip />;
  }

  const { updateTime, createTime } = detail;

  if (updateTime) {
    return t('UPDATED_TIME', {
      value: formatTime(updateTime, 'YYYY-MM-DD HH:mm:ss') || '-',
    });
  }

  return t('CREATED_TIME', {
    diff: formatTime(createTime, 'YYYY-MM-DD HH:mm:ss') || '-',
  });
}

function WorkloadItem({ detail, prefix }: Props): JSX.Element {
  const kind = get(detail, 'module');
  const version = get(detail, 'annotations["deployment.kubernetes.io/revision"]');
  const showRecord = !['statefulsets', 'daemonsets'].some(item => item === kind);

  return (
    <ItemWrapper>
      <Field
        avatar={<Icon name={ICON_TYPES[detail.module]} size={40} />}
        value={
          <Link to={`${prefix}/${detail.module}/${detail.name}`}>{getDisplayName(detail)}</Link>
        }
        label={getDescription(detail)}
      />
      <Field value={kind ? t(`WORKLOAD_TYPE_${kind.toUpperCase()}`) : '-'} label={t('TYPE')} />
      <Field
        value={<WorkloadStatus record={detail} module={detail.module} />}
        label={t('STATUS')}
      />
      {showRecord && <Field value={version ? `#${version}` : '-'} label={t('REVISION_RECORD')} />}
    </ItemWrapper>
  );
}

export default WorkloadItem;
