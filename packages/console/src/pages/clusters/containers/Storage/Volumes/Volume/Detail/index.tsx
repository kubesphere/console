/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  DetailPage,
  formatTime,
  pvcStore,
  StatusIndicator,
  useCommonActions,
  VolumeDetail,
} from '@ks-console/shared';
import { Pen, Trash } from '@kubed/icons';
import { get, isEmpty } from 'lodash';
import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWatchQueryByQueryKeys } from '../../hooks';

const LOCALES_STATUS: Record<string, string> = {
  Bound: 'VOLUME_STATUS_BOUND',
  Lost: 'VOLUME_STATUS_LOST',
  Pending: 'VOLUME_STATUS_PENDING',
  Terminating: 'VOLUME_STATUS_TERMINATING',
  Updating: 'VOLUME_STATUS_UPDATING',
};

export default function VolumeDetailPage() {
  const params = useParams();
  const { cluster, name, workspace, namespace } = params;
  const navigate = useNavigate();
  const ref = useRef<{ refetch: () => void; detail: VolumeDetail }>(null);
  const [detail, setDetail] = useState<VolumeDetail>();
  const module = 'volumes';
  const authKey = 'volumes';

  useWatchQueryByQueryKeys([pvcStore.module, params], setDetail);

  const listUrl = useMemo(() => {
    const { isFedManaged } = detail ?? {};

    if (workspace) {
      if (isFedManaged) {
        return `/${workspace}/federatedprojects/${namespace}/${module}`;
      }

      return `/${workspace}/clusters/${cluster}/projects/${namespace}/${module}`;
    }
    return `/clusters/${cluster}/${module}`;
  }, [cluster, module, namespace, workspace, detail]);

  const callback = (type: string) => {
    if (type === 'editBaseInfo' || type === 'editYaml') {
      ref.current?.refetch();
    } else {
      navigate(listUrl);
    }
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: pvcStore,
    params: { cluster, name, namespace },
    callback,
  });

  const attrs = (data: VolumeDetail) => {
    if (isEmpty(data)) {
      return [];
    }

    const {
      createTime,
      creator,
      phase,
      capacity,
      namespace: detailNameSpace,
      accessMode = '-',
    } = data;

    const storageClassName =
      data.storageClassName || get(data, "annotations['volume.beta.kubernetes.io/storage-class']");

    const provisioner = get(
      data,
      "annotations['volume.beta.kubernetes.io/storage-provisioner']",
      '-',
    );

    return [
      {
        label: t('PROJECT'),
        value: detailNameSpace,
      },
      {
        label: t('STATUS'),
        value: (
          <div>
            <StatusIndicator type={phase}>{t(phase ? LOCALES_STATUS[phase] : '')}</StatusIndicator>
          </div>
        ),
      },
      {
        label: t('CAPACITY'),
        value: capacity,
      },
      {
        label: t('ACCESS_MODE_TCAP'),
        value: accessMode,
      },
      {
        label: t('STORAGE_CLASS'),
        value: storageClassName,
      },
      {
        label: t('PROVISIONER'),
        value: provisioner,
      },
      {
        label: t('PERSISTENT_VOLUME'),
        value: get(data, '_originData.spec.volumeName', ''),
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: createTime ? formatTime(createTime) : '',
      },
      {
        label: t('CREATOR'),
        value: creator,
      },
    ];
  };

  const tabs = useMemo(() => {
    const path = `/clusters/${cluster}/projects/${namespace}/volumes/${name}`;
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
      {
        title: t('SNAPSHOT_PL'),
        path: `${path}/snapshot`,
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
      onClick: editYaml,
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
    <DetailPage
      ref={ref}
      tabs={tabs}
      store={pvcStore}
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
