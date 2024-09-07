/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { get, omit } from 'lodash';
import { Field } from '@kubed/components';
import { Storage } from '@kubed/icons';

import {
  getDisplayName,
  TableRef,
  StatusIndicator,
  formatTime,
  Panel,
  Icon,
  DataTable,
  useDetailPage,
  StorageClassDetail,
  pvcStore,
} from '@ks-console/shared';

import type { Column } from '@ks-console/shared';

const { getResourceUrl, getWatchListUrl, mapper: formatVolumeData } = pvcStore;

const LOCALES_STATUS: Record<string, string> = {
  Bound: 'VOLUME_STATUS_BOUND',
  Lost: 'VOLUME_STATUS_LOST',
  Pending: 'VOLUME_STATUS_PENDING',
  Terminating: 'VOLUME_STATUS_TERMINATING',
  Updating: 'VOLUME_STATUS_UPDATING',
};

import {
  ItemContainer,
  TitleStyle,
  DescStyle,
  ItemStyle,
  BottomStyle,
  CardTitle,
  CardStyle,
} from './styles';

export default function StorageClassesDetailVolumes() {
  //   const authKey = 'storageclasses';
  const module = 'storageclasses';
  const params = useParams();

  const tableRef = useRef<TableRef>();
  //   const refetchData = tableRef.current?.refetch ?? noop;
  //   const tableInstance = tableRef.current?.instance;
  const url = getResourceUrl({ ...omit(params, 'name') });

  // const [detail] = useStore('detailProps');
  const { detail } = useDetailPage<StorageClassDetail>();

  const Columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      searchable: true,
      render: (value, row) => {
        return <Field value={getDisplayName(row)} avatar={<Storage size={40} />} />;
      },
    },
    {
      title: t('STATUS'),
      field: 'phase',
      render: phase => (
        <StatusIndicator type={phase}>{t(phase ? LOCALES_STATUS[phase] : '')}</StatusIndicator>
      ),
    },
    {
      title: t('CAPACITY'),
      field: 'capacity',
      render: value => value || '-',
    },
    {
      title: t('MOUNT_STATUS'),
      field: 'inUse',
      width: '12%',
      render: inUse => (inUse ? t('MOUNTED') : t('NOT_MOUNTED')),
    },
    {
      title: t('PROJECT'),
      field: 'namespace',
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      render: createTime => formatTime(createTime),
    },
  ];

  const renderResizeItem = ({
    src,
    title,
    des,
    iconName,
    key,
  }: {
    src?: string;
    title: string;
    des: string;
    iconName?: string;
    key: number;
  }) => {
    return (
      <ItemContainer key={key}>
        {iconName ? <Icon name={iconName} size={40} /> : <img src={src} className="icon"></img>}
        <div>
          <TitleStyle>{title}</TitleStyle>
          <DescStyle>{des}</DescStyle>
        </div>
      </ItemContainer>
    );
  };

  const renderResize = () => {
    const { annotations } = detail ?? {};

    const resizeEnabled = JSON.parse(get(annotations, 'resize.kubesphere.io/enabled', 'false'));

    const restartEnabled = JSON.parse(get(annotations, 'restart.kubesphere.io/enabled', 'false'));

    const storageLimit = get(annotations, 'resize.kubesphere.io/storage-limit', '10000Gi');
    const Threshold = get(annotations, 'resize.kubesphere.io/threshold', '10%');
    const increase = get(annotations, 'resize.kubesphere.io/increase', '10%');
    const maxTime = get(annotations, 'restart.kubesphere.io/max-time', '300');
    const maxTimeItem = {
      title: t('VALUE_TIMEOUT', { value: maxTime }),
      src: '/assets/history_duotone.svg',
      des: t('RESTART_WORKLOAD_AUTOMATICALLY'),
    };
    const itemArr = [
      {
        iconName: 'storage',
        title: storageLimit,
        des: t('MAXIMUM_SIZE_SCAP'),
      },
      {
        src: '/assets/chart.svg',
        title: Threshold,
        des: t('THRESHOLD'),
      },
      {
        iconName: 'stretch',
        title: increase,
        des: t('INCREMENT'),
      },
    ];

    if (restartEnabled) {
      itemArr.push(maxTimeItem);
    }

    return (
      resizeEnabled && (
        <Panel>
          <ItemStyle>
            <img src="/assets/storageclass_autoresizer.svg" className="icon"></img>
            <div>
              <TitleStyle>{t('AUTO_EXPANSION')}</TitleStyle>
              <DescStyle>{t('AUTO_EXPANSION_DESC')}</DescStyle>
            </div>
          </ItemStyle>
          <BottomStyle>
            {itemArr.map((item, key) => renderResizeItem({ ...item, key }))}
          </BottomStyle>
        </Panel>
      )
    );
  };

  return (
    <>
      {renderResize()}
      <CardStyle>
        <CardTitle>{t('PERSISTENT_VOLUME_CLAIM_PL')}</CardTitle>
        <DataTable
          ref={tableRef}
          rowKey="uid"
          columns={Columns}
          tableName="storageClassDetailList"
          url={url}
          parameters={{ storageClassName: params.name }}
          format={formatVolumeData}
          useStorageState={false}
          placeholder={t('SEARCH_BY_NAME')}
          watchOptions={{
            enabled: true,
            module,
            url: getWatchListUrl(),
          }}
        />
      </CardStyle>
    </>
  );
}
