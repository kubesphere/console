/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  DetailPage,
  DetailPageRef,
  formatTime,
  hasPermission,
  Icon,
  StatusIndicator,
  useCommonActions,
  VolumeSnapshotClassDetail,
  volumeSnapshotClassStore,
  VolumeSnapshotDetail,
  volumeSnapshotStore,
} from '@ks-console/shared';

import { Tooltip } from '@kubed/components';
import { Copy, Pen, Snapshot, Trash } from '@kubed/icons';
import { get, isEmpty } from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { useQueryDetail } = volumeSnapshotStore;

const { useQueryDetail: useQueryClassDetail } = volumeSnapshotClassStore;

export default function SnapshotsDetailPage() {
  const ref = useRef<DetailPageRef<VolumeSnapshotClassDetail>>(null);
  const { cluster, name, namespace, workspace } = useParams();
  const module = 'volume-snapshots';
  const authKey = 'volume-snapshots';
  const navigate = useNavigate();

  const { data: detail = {} as VolumeSnapshotDetail, refetch } = useQueryDetail({
    name,
    cluster,
    namespace,
  });
  const { data: snapshotClassdetail = {} as VolumeSnapshotClassDetail } = useQueryClassDetail({
    name: detail?.snapshotClassName,
    cluster,
  });

  const listUrl = useMemo(() => {
    if (workspace) {
      return `/${workspace}/clusters/${cluster}/projects/${namespace}/${module}`;
    }
    return `/clusters/${cluster}/${module}`;
  }, []);

  const showApply = useMemo(() => {
    return (
      !isEmpty(snapshotClassdetail) &&
      hasPermission({
        module: 'volumes',
        action: 'create',
        project: namespace,
        cluster,
      })
    );
  }, []);

  const attrs = useCallback(() => {
    if (isEmpty(detail)) {
      return [];
    }

    const {
      createTime,
      restoreSize,
      backupStatus = '',
      creator,
      errorMessage,
      namespace: detailNamespace,
      snapshotClassName,
    } = detail;

    return [
      {
        label: t('PROJECT'),
        value: detailNamespace,
      },
      {
        label: t('STATUS'),
        value: (
          <div>
            <StatusIndicator type={backupStatus as 'success'}>
              {t(`CREATE_STATUS_${backupStatus.toUpperCase()}`)}
            </StatusIndicator>
            {!isEmpty(errorMessage) && (
              <Tooltip content={errorMessage}>
                <Icon name={'question'} />
              </Tooltip>
            )}
          </div>
        ),
      },
      {
        label: t('CAPACITY'),
        value: restoreSize,
      },
      {
        label: t('VOLUME_SNAPSHOT_CLASS'),
        value: snapshotClassName,
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(createTime),
      },
      {
        label: t('CREATOR'),
        value: creator,
      },
    ];
  }, [detail]);

  const callback = (type: string) => {
    if (type === 'editBaseInfo' || type === 'editYaml') {
      refetch();
    } else {
      navigate(listUrl);
    }
  };
  const { editYaml, del } = useCommonActions({
    store: volumeSnapshotStore,
    params: { cluster, name },
    callback,
  });

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/projects/${namespace}/${module}/${name}`;
    return [
      {
        title: t(`DATA_SOURCE`),
        path: `${path}/source`,
      },
      {
        title: t('EVENT_PL'),
        path: `${path}/events`,
      },
    ];
  }, []);

  const actions = [
    {
      key: 'editYaml',
      icon: <Pen />,
      text: t('EDIT_YAML'),
      action: 'edit',
      show: true,
      onClick: () =>
        editYaml({
          initialValues: detail,
        }),
    },
    {
      key: 'apply',
      icon: <Copy />,
      text: t('CREATE_VOLUME'),
      show: () => {
        return showApply && detail.backupStatus === 'success' && isEmpty(detail.error);
      },
      onClick: async () => {},
    },
    {
      key: 'delete',
      icon: <Trash />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: true,
      disabled: ['Bound', 'Released'].indexOf(get(detail, 'phase', '')) > -1,
      onClick: del,
    },
  ];

  return (
    <DetailPage
      ref={ref}
      tabs={tabs}
      data={detail}
      store={volumeSnapshotStore}
      params={{ cluster, name, namespace }}
      authKey={authKey}
      sideProps={{
        actions: actions,
        attrs,
        icon: <Snapshot size={28} />,
        breadcrumbs: {
          label: t('VOLUME_SNAPSHOT_PL'),
          url: listUrl,
        },
      }}
    />
  );
}
