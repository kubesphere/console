/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  DetailPage,
  formatTime,
  PVDetail,
  nvStore,
  StatusIndicator,
  useCommonActions,
} from '@ks-console/shared';
import { Pen, Trash } from '@kubed/icons';
import { get, isEmpty } from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PVDetailPage() {
  const { cluster, name, namespace } = useParams();
  const navigate = useNavigate();
  const { module } = nvStore;
  // authKey persistentvolumes
  const authKey = module;

  const ref = useRef<{ detail: PVDetail; refetch: () => void }>(null);

  const listUrl = `/clusters/${cluster}/volumes/PV`;

  const attrs = useCallback(detail => {
    if (isEmpty(detail)) {
      return [];
    }

    const {
      createTime,
      phase,
      storageClassName,
      volumeHandle,
      persistentVolumeReclaimPolicy,
      accessModes = ['-'],
      capacity,
      volumeMode,
    } = detail;

    return [
      {
        label: t('STATUS'),
        value: (
          <div>
            <StatusIndicator type={phase}>
              {t(`PV_STATUS_${phase && phase.toUpperCase()}`)}
            </StatusIndicator>
          </div>
        ),
      },
      {
        label: t('CAPACITY'),
        value: capacity,
      },
      {
        label: t('ACCESS_MODE_TCAP'),
        value: accessModes.join(','),
      },
      {
        label: t('STORAGE_CLASS'),
        value: storageClassName,
      },
      {
        label: t('VOLUME_HANDLE'),
        value: volumeHandle || '-',
      },
      {
        label: t('RECLAIM_POLICY'),
        value: persistentVolumeReclaimPolicy,
      },
      {
        label: t('VOLUME_MODE'),
        value: t(`VOLUME_MODE_${volumeMode.toUpperCase()}`),
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(createTime),
      },
    ];
  }, []);

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/pv/${name}`;
    return [
      {
        title: t(`RESOURCE_STATUS`),
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

  const callback = (type: string) => {
    if (type === 'editBaseInfo' || type === 'editYaml') {
      // @ts-ignore
      ref.current.refetch();
    } else {
      navigate(listUrl);
    }
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: nvStore,
    params: { cluster, name, namespace },
    callback,
  });

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
      onClick: editYaml,
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
      store={nvStore}
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
