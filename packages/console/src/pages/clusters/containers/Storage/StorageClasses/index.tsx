/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  Avatar,
  Column,
  getDisplayName,
  ListPage,
  storageClassStore,
  TableRef,
  useActionMenu,
  useCommonActions,
} from '@ks-console/shared';
import { Database, Pen, Storage, Trash } from '@kubed/icons';
import { get } from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const StorageClasses = () => {
  const { module, getWatchListUrl, getResourceUrl } = storageClassStore;
  const tableRef = React.useRef<TableRef<any>>();
  const params = useParams();

  const { cluster } = params;
  const callback = () => {
    tableRef?.current?.refetch();
  };
  const { editBaseInfo, del } = useCommonActions({
    store: storageClassStore,
    params: { cluster },
    callback,
  });

  const renderItemActions = useActionMenu({
    authKey: module,
    params: { cluster },
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: editBaseInfo,
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        onClick: del,
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
        return (
          <Avatar
            icon={<Storage size={40} />}
            title={getDisplayName(row)}
            description={row.description}
            to={`${location.pathname}/${row.name}`}
          />
        );
      },
    },
    {
      title: t('PVC_COUNT'),
      field: 'volumeCount',
      canHide: true,
      render: (value, record) => get(record, 'annotations["kubesphere.io/pvc-count"]') || 0,
    },
    {
      title: t('DEFAULT_STORAGE_CLASS'),
      field: 'default',
      canHide: true,
      render: value => (value ? t('YES') : '-'),
    },
    {
      title: t('ALLOW_VOLUME_CLONE'),
      field: 'annotations',
      canHide: true,
      width: '12%',
      render: annotations =>
        annotations['storageclass.kubesphere.io/allow-clone'] === 'true' ? t('TRUE') : t('FALSE'),
    },
    {
      title: t('ALLOW_VOLUME_SNAPSHOT'),
      field: '_originData',
      canHide: true,
      render: _originData =>
        _originData.metadata.annotations['storageclass.kubesphere.io/allow-snapshot'] === 'true'
          ? t('TRUE')
          : t('FALSE'),
    },
    {
      title: t('ALLOW_VOLUME_EXPANSION'),
      field: 'allowVolumeExpansion',
      canHide: true,
      render: allowVolumeExpansion => (allowVolumeExpansion ? t('TRUE') : t('FALSE')),
    },
    {
      title: t('PROVISIONER'),
      field: 'provisioner',
      canHide: true,
    },

    {
      id: 'more',
      title: '',
      width: 20,
      render: (_, row) => renderItemActions(row),
    },
  ];

  const renderBatchActions = useActionMenu({
    authKey: module,
    params,
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
    authKey: module,
    params: { cluster },
    autoSingleButton: true,
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        onClick: () => {},
        props: {
          color: 'secondary',
          shadow: true,
        },
      },
    ],
  });

  const table = {
    columns: Columns,
    ref: tableRef,
    url: getResourceUrl({ cluster }),
    batchActions: renderBatchActions({}),
    toolbarRight: renderTableActions({}),
    useStorageState: false,
    watchOptions: {
      enabled: true,
      module,
      url: getWatchListUrl(),
    },
  };
  const banner = {
    icon: <Database />,
    title: t('STORAGE_CLASS_PL'),
    description: t('STORAGE_CLASS_DESC'),
    tips: [],
  };
  return <ListPage banner={banner} table={table} store={storageClassStore} />;
};

export default StorageClasses;
