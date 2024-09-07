/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Field, Tooltip } from '@kubed/components';
import StatusReason from '../../../../../StatusReason';
import { formatTime, getDisplayName, getWorkloadStatus } from '../../../../../../utils';
import Icon from '../../../../../Icon';
import StatusIndicator from '../../../../../StatusIndicator';

import { FlexDiv, ItemWrappers } from '../styles';

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

function getStatus(detail?: any) {
  return detail.status?.state ? (
    <Tooltip content={detail.status?.state}>
      <StatusIndicator type="error">{t('FAILURE')}</StatusIndicator>
    </Tooltip>
  ) : (
    <StatusIndicator type={detail.status?.phase}>{t(detail.status?.phase)}</StatusIndicator>
  );
}
function WORKLOADATTR(detail: Detail): Record<string, any>[] {
  let attr: Record<string, any>[] = [];
  const { spec, status } = detail;
  attr = attr.concat([
    {
      label: t('STATUS'),
      value: getStatus(detail),
    },
    {
      label: t('NODE'),
      value: `${spec?.nodeName}（${status?.hostIP}）`,
    },
    {
      label: t('POD_IP_ADDRESS'),
      value: status?.podIP,
    },
    // {
    //   label: t('UPDATE_TIME_COLON'),
    //   value: formatTime(status?.startTime, 'YYYY-MM-DD HH:mm:ss'),
    // },
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

function PodItems({ detail, prefix }: Props): JSX.Element {
  // TODO 自定义模板的详情则不跳转
  const renderValue =
    detail.module === 'EdgeAppSet' ? (
      getDisplayName(detail)
    ) : (
      <Link to={`${prefix}/${detail.metadata?.name || detail.name}`}>{getDisplayName(detail)}</Link>
    );
  return (
    <FlexDiv>
      <ItemWrappers>
        <Field
          avatar={<Icon name="pod" size={40} />}
          value={renderValue}
          label={getDescription(detail)}
        />
        {WORKLOADATTR(detail).map(item => (
          <Field key={item.name} {...item} />
        ))}
      </ItemWrappers>
    </FlexDiv>
  );
}

export default PodItems;
