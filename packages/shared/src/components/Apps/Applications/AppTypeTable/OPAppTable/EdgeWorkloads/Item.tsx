/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { Field, Checkbox, Tooltip } from '@kubed/components';
import StatusReason from '../../../../../StatusReason';
import { formatTime, getDisplayName, getWorkloadStatus } from '../../../../../../utils';
import Icon from '../../../../../Icon';
import StatusIndicator from '../../../../../StatusIndicator';
import WorkloadStatus from './Status';

import { FlexDiv, SelectDiv, ItemWrappers } from '../styles';

export interface Detail {
  kind: string;
  module: string;
  name: string;
  namespace: string;
  createTime: string;
  spec: {
    nodeSelectors: {
      nodeGroup: string;
      nodeName: string;
    }[];
    clusterIP: string;
    nodeName: string;
    ports?: {
      nodePort: number;
      protocol: string;
    }[];
  };
  status: {
    // state?: string;
    // phase: string;
    [key: string]: string | number;
  };
  metadata: {
    name: string;
    labels: Record<string, string>;
    creationTimestamp?: string;
    namespace: string;
  };
}

type Props = {
  detail: Detail;
  prefix?: string;
  setSelectItem: (detail?: Detail) => void;
  selectItem?: Detail;
  showSelect?: boolean;
};

function getStatus(detail?: any) {
  const { reason, status } = getWorkloadStatus(detail as any, 'deployments');
  return (
    <StatusIndicator type={status as any}>
      <Tooltip
        disabled={!reason && !detail.status?.message}
        content={reason || detail.status?.message}
      >
        <span>
          <WorkloadStatus
            type={status}
            name={t(status.toUpperCase())}
            total={get(detail, 'spec.replicas', 0)}
            ready={get(detail, 'status.readyReplicas', 0)}
            flicker
          />
        </span>
      </Tooltip>
    </StatusIndicator>
  );
}
function WORKLOADATTR(detail: Detail): Record<string, any>[] {
  return [
    {
      label: t('STATUS'),
      value: getStatus(detail),
    },
    {
      label: t('NODE_GROUP_PL'),
      value: detail?.metadata.labels?.['apps.edgewize.io/nodegroup'] || '-',
    },
    {
      label: t('EDGE_NODE_PL'),
      value: detail?.metadata.labels?.['apps.edgewize.io/node'] || '-',
    },
  ];
}

function getDescription(detail: Detail) {
  const { status, reason } = getWorkloadStatus(detail as any, 'deployments');

  if (reason) {
    return <StatusReason status={status} reason={t(reason)} data={detail} hasTip />;
  }

  const { status: Status, createTime } = detail;

  if (Status?.startTime) {
    return t('UPDATED_TIME', {
      value: formatTime(Status?.startTime, 'YYYY-MM-DD HH:mm:ss') || '-',
    });
  }

  return t('CREATED_TIME', {
    diff: formatTime(createTime || '', 'YYYY-MM-DD HH:mm:ss') || '-',
  });
}

function WorkloadItem({
  detail,
  prefix,
  setSelectItem,
  selectItem,
  showSelect = true,
}: Props): JSX.Element {
  const renderValue = detail?.status.readyReplicas ? (
    <Link to={`${prefix}/${detail.metadata?.name || detail.name}`}>{getDisplayName(detail)}</Link>
  ) : (
    <span>{getDisplayName(detail)}</span>
  );
  return (
    <FlexDiv>
      {showSelect && (
        <SelectDiv>
          <Checkbox
            checked={!!selectItem?.name}
            onChange={(e: any) => {
              const check = e.target.checked;
              setSelectItem(check ? detail : undefined);
            }}
          />
        </SelectDiv>
      )}
      <ItemWrappers>
        <Field
          avatar={<Icon name="backup" size={40} />}
          value={renderValue}
          label={getDescription(detail)}
        />
        {WORKLOADATTR(detail).map(item => (
          <Field key={item.value} {...item} />
        ))}
      </ItemWrappers>
    </FlexDiv>
  );
}

export default WorkloadItem;
