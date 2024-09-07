/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { Column, VolumeSnapshotClassDetail, TableRef } from '@ks-console/shared';
import {
  Avatar,
  formatTime,
  getDisplayName,
  ListPage,
  useActionMenu,
  useCommonActions,
  volumeSnapshotClassStore,
} from '@ks-console/shared';
import { Catalog, Pen, Storage, Trash } from '@kubed/icons';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function VolumeSnapshotClasses() {
  const {
    module,
    module: authKey,
    getResourceUrl,
    getWatchListUrl,
    apiVersion,
  } = volumeSnapshotClassStore;
  const showAction = (row?: Record<string, any>) => {
    return !!(row && !row.isFedManaged);
  };

  const { cluster = 'default', namespace } = useParams();
  const url = getResourceUrl({ cluster, namespace });

  const tableRef = useRef<TableRef>();

  const callback = () => {
    tableRef?.current?.refetch();
  };
  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: volumeSnapshotClassStore,
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
        action: 'edit',
        show: row => showAction(row as unknown as VolumeSnapshotClassDetail),
        onClick: editBaseInfo,
      },
      {
        key: 'editYaml',
        icon: <Pen />,
        text: t('EDIT_YAML'),
        action: 'edit',
        show: row => showAction(row as unknown as VolumeSnapshotClassDetail),
        onClick: record => {
          editYaml({
            ...record,
            _originData: { apiVersion, kind: 'VolumeSnapshotClass', ...record._originData },
          });
        },
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

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      searchable: true,
      render: (value, row) => {
        const detailUrl = `/clusters/${cluster}/volume-snapshot-classes/${value}`;

        return (
          <Avatar
            icon={<Storage size={40} />}
            title={getDisplayName(row)}
            description={row.description}
            to={detailUrl}
          />
        );
      },
    },
    {
      title: t('VOLUME_SNAPSHOT_PL'),
      field: 'count',
      canHide: true,
      width: '17.6%',
    },
    {
      title: t('PROVISIONER'),
      field: 'driver',
      canHide: true,
      width: '17.6%',
    },
    {
      title: t('DELETION_POLICY'),
      field: 'deletionPolicy',
      canHide: true,
      width: '17.6%',
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: '12.3%',
      render: time => formatTime(time),
    },
    {
      id: 'more',
      title: '',
      width: 20,
      render: (value, row) => renderItemActions(row),
    },
  ];

  const banner = {
    icon: <Catalog />,
    title: t('VOLUME_SNAPSHOT_CLASS_PL'),
    description: t('VOLUME_SNAPSHOT_CLASS_DESC'),
  };

  const renderBatchActions = useActionMenu({
    authKey: authKey,
    params: { cluster },
    autoSingleButton: true,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        props: {
          color: 'error',
        },
        onClick: () => {
          del(tableRef?.current?.getSelectedFlatRows() || []);
        },
      },
    ],
  });

  const renderTableActions = useActionMenu({
    authKey: authKey,
    params: { cluster },
    autoSingleButton: true,
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        onClick: () => {
          // setCreateVisible(true);
          // trigger('create.snapshot', {
        },
        props: {
          color: 'secondary',
          shadow: true,
        },
      },
    ],
  });

  const table = {
    ref: tableRef,
    columns,
    batchActions: renderBatchActions({}),
    useStorageState: false,
    toolbarRight: renderTableActions({}),
    url,
    watchOptions: {
      enabled: true,
      module,
      url: getWatchListUrl(),
    },
  };

  return (
    <ListPage
      banner={banner}
      table={table}
      currentTab={'Volumes/Volumes'}
      store={volumeSnapshotClassStore}
    />
  );
}
