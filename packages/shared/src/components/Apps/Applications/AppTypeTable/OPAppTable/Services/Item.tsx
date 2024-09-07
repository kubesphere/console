/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Field } from '@kubed/components';
import StatusReason from '../../../../../StatusReason';
import { formatTime, getDisplayName, getWorkloadStatus } from '../../../../../../utils';
import Icon from '../../../../../Icon';

import { ItemWrappers } from '../styles';

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
};

function WORKLOADATTR(detail: Detail): Record<string, any>[] {
  let attr: Record<string, any>[] = [];
  const { spec, metadata } = detail;
  attr = attr.concat([
    {
      label: t('PROJECT'),
      value: `${metadata?.namespace}`,
    },
    {
      label: t('INTERNAL_ACCESS'),
      value: `${spec?.clusterIP}`,
    },
    {
      label: t('EXTERNAL_ACCESS'),
      value:
        spec?.ports
          ?.filter(item => item.nodePort)
          ?.map(item => `${item.nodePort}/${item.protocol}`)
          .join(';') || '-',
    },
  ]);
  return attr;
}

function getDescription(detail: Detail) {
  const { status, reason } = getWorkloadStatus(detail as any, detail.module);

  if (reason) {
    return <StatusReason status={status} reason={t(reason)} data={detail} hasTip />;
  }

  const { status: Status, metadata } = detail;

  if (Status?.startTime) {
    return t('UPDATED_TIME', {
      value: formatTime(Status?.startTime, 'YYYY-MM-DD HH:mm:ss') || '-',
    });
  }

  return t('CREATED_TIME', {
    diff: formatTime(metadata?.creationTimestamp || '', 'YYYY-MM-DD HH:mm:ss') || '-',
  });
}

function WorkloadItem({ detail, prefix }: Props): JSX.Element {
  const renderValue =
    detail.module === 'EdgeAppSet' ? (
      getDisplayName(detail)
    ) : (
      <Link to={`${prefix}/${detail.metadata?.name || detail.name}`}>{getDisplayName(detail)}</Link>
    );
  return (
    <ItemWrappers>
      <Field
        avatar={<Icon name="appcenter" size={40} />}
        value={renderValue}
        label={getDescription(detail)}
      />
      {WORKLOADATTR(detail).map(item => (
        <Field key={item.name} {...item} />
      ))}
    </ItemWrappers>
  );
}

export default WorkloadItem;
