/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  Avatar,
  formatTime,
  hasPermission,
  ListPage,
  StatusIndicator,
  useActionMenu,
  useCommonActions,
  VolumeSnapshotDetail,
  volumeSnapshotStore,
  Column,
  TableRef,
} from '@ks-console/shared';

import { notify, Tooltip } from '@kubed/components';
import { Copy, Question, Snapshot, Trash } from '@kubed/icons';
import { isEmpty } from 'lodash';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { banner, getStatusSelectOption, tabs } from '../constants';

import { TitleWithIconStyle } from './styles';

const { checkName, getWatchListUrl } = volumeSnapshotStore;

// const { fetchPVCDetail } = pvcStore;

const LOCALES_WORD_MAPPER: Record<string, string> = {
  success: 'CREATE_STATUS_SUCCESS',
  updating: 'CREATE_STATUS_UPDATING',
  failed: 'CREATE_STATUS_FAILED',
  deleting: 'CREATE_STATUS_DELETING',
};

export default function Snapshots() {
  const module = 'volume-snapshots';
  const authKey = 'volumes';
  const tableRef = useRef<TableRef>();
  const { cluster, namespace } = useParams();

  const callback = () => {
    tableRef?.current?.refetch();
  };
  const { del } = useCommonActions({
    store: volumeSnapshotStore,
    params: { cluster },
    callback,
  });
  const showApply = (params: Record<string, any>) => {
    return hasPermission({
      module: authKey,
      action: 'create',
      project: params.namespace,
      cluster: cluster,
    });
  };

  const checkSnapshotClassExist = async (name: string) => {
    const snapshotClassDetail = await checkName({ name, cluster, namespace }, {});
    return snapshotClassDetail?.exist;
  };

  const renderItemActions = useActionMenu({
    authKey: authKey,
    params: { cluster: cluster || '' },
    actions: [
      {
        key: 'apply',
        icon: <Copy />,
        text: t('CREATE_VOLUME'),
        show: item => {
          return showApply(item) && item.backupStatus === 'success' && isEmpty(item.error);
        },
        onClick: async item => {
          // const { namespace: detailNamespace, snapshotClassName } =
          //   item as unknown as IVolumeSnapshotDetail;

          const { snapshotClassName } = item as unknown as VolumeSnapshotDetail;

          const exist = await checkSnapshotClassExist(snapshotClassName);

          if (!exist) {
            notify.error(
              <div>
                <div>{t('SNAPSHOT_CLASS_NOT_EXIST_TITLE')}</div>
                <p>{t('SNAPSHOT_CLASS_NOT_EXIST')}</p>
              </div>,
            );
            return;
          }
          // const storageClassName = get(item, '_originData.spec.source.persistentVolumeClaimName');
          // const pvcDetail = await fetchPVCDetail({
          //   cluster,
          //   name: storageClassName,
          //   namespace: detailNamespace,
          // });
          // trigger('volume.create', {
          //   fromSnapshot: true,
          //   module: 'persistentvolumeclaims',
          //   cluster,
          //   namespace,
          //   store: new VolumeStore(),
          //   noCodeEdit: true,
          //   extendformTemplate: {
          //     spec: {
          //       resources: {
          //         requests: {
          //           storage: get(item, 'restoreSize'),
          //         },
          //       },
          //       storageClassName: get(volumeStore, 'detail.storageClassName'),
          //       dataSource: {
          //         name: get(item, 'name'),
          //         kind: 'VolumeSnapshot',
          //         apiGroup: 'snapshot.storage.k8s.io',
          //       },
          //     },
          //   },
          // });
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

  const renderBatchActions = useActionMenu({
    authKey: authKey,
    params: { cluster },
    autoSingleButton: true,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: del,
        props: {
          color: 'error',
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

  const Columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      searchable: true,
      render: (value, row) => {
        const detailUrl = `/clusters/${cluster}/projects/${row.namespace}/${module}/${value}`;

        return (
          <Avatar
            description={row.snapshotClassName}
            icon={<Snapshot size={40} />}
            record={row}
            to={detailUrl}
          />
        );
      },
    },
    {
      title: t('STATUS'),
      field: 'status',
      canHide: true,
      searchable: true,
      filterOptions: getStatusSelectOption(),
      render: (value, record) => {
        const { errorMessage, backupStatus } = record as unknown as VolumeSnapshotDetail;
        return (
          <TitleWithIconStyle>
            <StatusIndicator type={backupStatus}>
              {t(LOCALES_WORD_MAPPER[backupStatus])}
            </StatusIndicator>
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
      title: t('PROJECT'),
      field: 'namespace',
      canHide: true,
    },
    {
      title: t('CAPACITY'),
      field: 'restoreSize',
      canHide: true,
      width: '20%',
      render: restoreSize => restoreSize || '-',
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
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
    rowKey: 'name',
    batchActions: renderBatchActions({}),
    toolbarRight: renderTableActions({}),
    watchOptions: {
      enabled: true,
      module,
      url: getWatchListUrl(),
    },
  };

  return (
    <ListPage
      banner={banner()}
      table={table}
      tabs={tabs()}
      currentTab={'volume-snapshots/snapshots'}
      store={volumeSnapshotStore}
      hasNamespaceSelector
    />
  );
}
