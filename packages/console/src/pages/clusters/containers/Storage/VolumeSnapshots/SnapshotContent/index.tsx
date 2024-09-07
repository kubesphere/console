/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { Column, VolumeSnapshotContentDetail, TableRef } from '@ks-console/shared';
import {
  Avatar,
  Constants,
  formatTime,
  ListPage,
  memoryFormat,
  StatusIndicator,
  useActionMenu,
  useCommonActions,
  volumeSnapshotContentStore,
} from '@ks-console/shared';

import { Tooltip } from '@kubed/components';
import { Eye, Pen, Question, Snapshot, Trash } from '@kubed/icons';
import { isEmpty, omit } from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';
import { banner, tabs } from '../constants';
import { TitleWithIconStyle } from '../Snapshots/styles';

const getStatusSelectOption = () =>
  Constants.VOLUME_SNAPSHOT_CLASS_STATUS.map(status => ({
    label: t(status.text),
    key: status.value,
  }));

export default function SnapshotsContent() {
  // const module = 'volume-snapshot-content';
  const authKey = 'volumes';

  const tableRef = React.useRef<TableRef<any>>();
  const params = useParams();

  const { cluster } = params;
  const callback = () => {
    tableRef?.current?.refetch();
  };
  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: volumeSnapshotContentStore,
    params: { cluster },
    callback,
  });

  const renderItemActions = useActionMenu({
    authKey: authKey,
    params: { cluster: cluster || '' },
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        onClick: record =>
          editBaseInfo({
            initialValues: omit(record, 'namespace'),
          }),
      },
      {
        key: 'editYaml',
        icon: <Eye />,
        text: t('VIEW_YAML'),
        action: 'edit',
        onClick: record =>
          editYaml({
            initialValues: record,
            readOnly: true,
          }),
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: item => {
          return !(item.backupStatus === 'deleting');
        },
        onClick: del,
      },
    ],
  });

  const renderBatchActions = useActionMenu({
    authKey: authKey,
    params: { cluster },
    autoSingleButton: true,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          del(tableRef?.current?.getSelectedFlatRows() || []);
        },
        props: {
          color: 'error',
        },
      },
    ],
  });

  const Columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      searchable: true,
      render: (value, row) => {
        const detailUrl = `/clusters/${cluster}/volume-snapshot-content/${value}`;

        return (
          <Avatar
            to={detailUrl}
            title={value}
            icon={<Snapshot size={40} />}
            description={row.snapshotClassName}
          />
        );
      },
    },
    {
      title: t('STATUS'),
      field: 'readyToUse',
      canHide: true,
      searchable: true,
      filterOptions: getStatusSelectOption(),
      render: (value, record) => {
        const { errorMessage, status } = record as unknown as VolumeSnapshotContentDetail;
        return (
          <TitleWithIconStyle>
            <StatusIndicator type={status}>{t(status.toUpperCase())}</StatusIndicator>
            {!isEmpty(errorMessage) && (
              <Tooltip content={errorMessage}>
                <Question />
              </Tooltip>
            )}
          </TitleWithIconStyle>
        );
      },
    },
    {
      title: t('CAPACITY'),
      field: 'restoreSize',
      width: '7%',
      canHide: true,
      render: restoreSize => `${memoryFormat(restoreSize, 'Gi')}Gi`,
    },
    {
      title: t('VOLUME_SNAPSHOT_CLASS'),
      field: 'snapshotClassName',
      canHide: true,
      width: '14%',
      render: snapshotClassName => snapshotClassName || '-',
    },
    {
      title: t('DELETION_POLICY'),
      field: 'deletionPolicy',
      canHide: true,
      width: '9.86%',
      render: deletionPolicy => deletionPolicy || '-',
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: '12.33%',
      render: time => formatTime(time),
    },
    {
      id: 'more',
      title: '',
      width: 20,
      render: (_, row) => renderItemActions(row),
    },
  ];

  const table = {
    ref: tableRef,
    columns: Columns,
    batchActions: renderBatchActions({}),
    rowKey: 'name',
  };

  return (
    <ListPage
      banner={banner()}
      table={table}
      tabs={tabs()}
      currentTab={'volume-snapshots/snapshot-content'}
      store={volumeSnapshotContentStore}
    />
  );
}
