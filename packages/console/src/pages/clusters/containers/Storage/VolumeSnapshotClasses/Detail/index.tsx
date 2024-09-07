/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  DetailPage,
  DetailPageRef,
  formatTime,
  useCommonActions,
  VolumeSnapshotClassDetail,
  volumeSnapshotClassStore,
} from '@ks-console/shared';
import { Pen, Trash } from '@kubed/icons';
import { isEmpty } from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { apiVersion } = volumeSnapshotClassStore;
export default function VolumeSnapshotClassDetailPage() {
  const params = useParams();
  const module = 'volume-snapshot-classes';
  const authKey = 'volumes';

  const navigate = useNavigate();
  const listUrl = `/clusters/${params.cluster}/${module}`;
  const ref = useRef<DetailPageRef<VolumeSnapshotClassDetail>>(null);

  const callback = (type: string) => {
    if (type === 'editBaseInfo' || type === 'editYaml') {
      // @ts-ignore
      ref.current.refetch();
    } else {
      navigate(listUrl);
    }
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: volumeSnapshotClassStore,
    params,
    callback,
  });
  const attrs = useCallback(detail => {
    if (isEmpty(detail)) {
      return [];
    }
    const { createTime, driver, deletionPolicy } = detail;

    return [
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
    ];
  }, []);

  const tabs = useMemo(() => {
    const path = `${listUrl}/${params.name}`;
    return [
      {
        title: t(`VOLUME_SNAPSHOT_PL`),
        path: `${path}/volume-snapshot`,
      },
    ];
  }, []);

  const actions = [
    {
      key: 'edit',
      icon: <Pen />,
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      show: true,
      onClick: editBaseInfo,
    },
    {
      key: 'editYaml',
      icon: <Pen />,
      text: t('EDIT_YAML'),
      action: 'edit',
      show: true,
      onClick: (record: any) => {
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
      type: 'danger',
      show: true,
      onClick: del,
    },
  ];

  return (
    <DetailPage<VolumeSnapshotClassDetail>
      ref={ref}
      tabs={tabs}
      store={volumeSnapshotClassStore}
      authKey={authKey}
      sideProps={{
        actions: actions,
        attrs: attrs,
        breadcrumbs: {
          label: t('PERSISTENT_VOLUME_PL'),
          url: listUrl,
        },
      }}
    />
  );
}
