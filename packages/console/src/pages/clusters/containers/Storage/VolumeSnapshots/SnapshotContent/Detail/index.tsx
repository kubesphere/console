/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  DetailPage,
  DetailPageRef,
  formatTime,
  memoryFormat,
  StatusIndicator,
  useCommonActions,
  VolumeSnapshotContentDetail,
  volumeSnapshotContentStore,
} from '@ks-console/shared';
import { Pen, Snapshot, Trash } from '@kubed/icons';
import { get, isEmpty, omit } from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function SnapshotsContentDetailPage() {
  const ref = useRef<DetailPageRef<VolumeSnapshotContentDetail>>(null);
  const params = useParams();
  const { cluster, name, namespace } = params;
  const navigate = useNavigate();

  const module = 'snapshot-content';
  const authKey = 'volumes';
  const listUrl = `/clusters/${cluster}/volume-snapshots/${module}`;

  const callback = (type: string) => {
    if (type === 'editBaseInfo' || type === 'editYaml') {
      // @ts-ignore
      ref.current.refetch();
    } else {
      navigate(listUrl);
    }
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: volumeSnapshotContentStore,
    params,
    callback,
  });

  const attrs = useCallback((detail: VolumeSnapshotContentDetail) => {
    if (isEmpty(detail)) {
      return [];
    }

    const {
      createTime,
      creator,
      status,
      restoreSize,
      snapshotClassName,
      snapshotHandle,
      driver,
      deletionPolicy,
    } = detail;

    return [
      {
        label: t('STATUS'),
        value: (
          <div>
            <StatusIndicator type={status}>{t(status ? status.toUpperCase() : '')}</StatusIndicator>
          </div>
        ),
      },
      {
        label: t('CAPACITY'),
        value: `${memoryFormat(restoreSize, 'Gi')}Gi`,
      },
      {
        label: t('VOLUME_SNAPSHOT_CLASS'),
        value: snapshotClassName,
      },
      {
        label: t('SNAPSHOT_HANDLE'),
        value: snapshotHandle,
      },
      {
        label: t('PROVISIONER'),
        value: driver,
      },
      {
        label: t('DELETION_POLICY'),
        value: deletionPolicy,
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(createTime),
      },
      {
        label: t('CREATOR'),
        value: creator === '' ? '-' : creator,
      },
    ];
  }, []);

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/volume-snapshot-content/:name`;
    return [
      {
        title: t('RESOURCE_STATUS'),
        path: `${path}/resource-status`,
      },
      {
        title: t(`METADATA`),
        path: `${path}/metadata`,
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
      onClick: (detail: Record<string, any>) => {
        editYaml({
          initialValues: detail,
          readOnly: true,
        });
      },
    },
    {
      key: 'edit',
      icon: <Pen />,
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      show: true,
      onClick: (detail: Record<string, any>) => {
        editBaseInfo({
          initialValues: omit(detail, 'namespace'),
        });
      },
    },
    {
      key: 'delete',
      icon: <Trash />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: true,
      disabled: (detail: Record<string, any>) =>
        ['Bound', 'Released'].indexOf(get(detail, 'phase', '')) > -1,
      onClick: del,
    },
  ];

  return (
    <DetailPage
      ref={ref}
      tabs={tabs}
      store={volumeSnapshotContentStore}
      params={{ cluster, name, namespace }}
      authKey={authKey}
      sideProps={{
        actions: actions,
        attrs,
        icon: <Snapshot size={28} />,
        breadcrumbs: {
          label: t('VOLUME_SNAPSHOT_CONTENT_PL'),
          url: listUrl,
        },
      }}
    />
  );
}
