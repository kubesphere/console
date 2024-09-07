/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { merge, omit } from 'lodash';
import { notify } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Icon,
  formatTime,
  DetailPage,
  DetailPageRef,
  configMapStore,
  useCommonActions,
} from '@ks-console/shared';
import type { FormattedConfigMap } from '@ks-console/shared';

import { NAME } from '../constants';
import { ConfigMapEditModal } from '../../../../components';

const PATH = '/clusters/:cluster/projects/:namespace/configmaps/:name';

export default function ConfigMapDetail(): JSX.Element {
  const { module, usePutMutation } = configMapStore;
  const { cluster, name, namespace } = useParams<'cluster' | 'namespace' | 'name'>();
  const configMapSettingEditModal = useDisclosure();
  const ref = useRef<DetailPageRef<FormattedConfigMap>>(null);
  const tabs = [{ path: `${PATH}/detail`, title: t('DATA') }];

  const navigate = useNavigate();

  const attrs = (data: FormattedConfigMap) => [
    { label: t('CLUSTER_PL'), value: cluster ? cluster : '' },
    { label: t('PROJECT_PL'), value: data?.namespace },
    {
      label: t('CREATION_TIME_TCAP'),
      value: data?.createTime ? formatTime(data?.createTime) : '',
    },
    {
      label: t('CREATOR'),
      value: data?.creator || '',
    },
  ];

  const callback = () => {
    navigate(`/clusters/${cluster}/configmaps`);
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: configMapStore,
    params: { cluster, name, namespace },
    callback: (action: string) => {
      if (action === 'delete') {
        callback();
      } else {
        ref.current?.refetch();
      }
    },
  });

  const actions = [
    {
      key: 'edit',
      icon: <Icon name="pen" />,
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      show: true,
      onClick: editBaseInfo,
    },
    {
      key: 'editYaml',
      icon: <Icon name="pen" />,
      text: t('EDIT_YAML'),
      action: 'edit',
      show: true,
      onClick: editYaml,
    },
    {
      key: 'editConfigMap',
      icon: <Icon name="pen" />,
      text: t('EDIT_SETTINGS'),
      action: 'edit',
      onClick: configMapSettingEditModal.open,
    },
    {
      key: 'delete',
      icon: <Icon name="trash" />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: true,
      onClick: (record: FormattedConfigMap) => del({ ...record, type: NAME }),
    },
  ];

  const { mutate: mutateConfigMapSettingEdit, isLoading: isEditConfigMapLoading } = usePutMutation(
    {},
    {
      onSuccess: () => {
        configMapSettingEditModal.close();
        notify.success(t('UPDATE_SUCCESSFUL'));
        ref.current?.refetch();
      },
    },
  );

  const handleEditConfigMap = (info: object) => {
    const detailData = ref.current?.detail;
    const data = merge(omit(detailData?._originData, 'data'), info);

    mutateConfigMapSettingEdit({
      params: {
        name: detailData?.name,
        namespace: detailData?.namespace,
        cluster,
      },
      data,
    });
  };

  return (
    <>
      <DetailPage<FormattedConfigMap>
        ref={ref}
        tabs={tabs}
        store={configMapStore}
        authKey={module}
        params={{ cluster, name, namespace }}
        sideProps={{
          actions,
          attrs,
          icon: <Icon name="key" size={28} style={{ verticalAlign: 'middle' }} />,
          breadcrumbs: {
            label: t('CONFIGMAP_PL'),
            url: `/clusters/${cluster}/configmaps`,
            listName: 'configuration-configmap',
          },
          description: ref.current?.detail.description,
        }}
      />
      {ref.current?.detail && configMapSettingEditModal.isOpen && (
        <ConfigMapEditModal
          visible={true}
          isSubmitting={isEditConfigMapLoading}
          onOk={handleEditConfigMap}
          onCancel={configMapSettingEditModal.close}
          isFederated={false} // todo get isFederated value
          disableSelect={true}
          detail={ref.current?.detail}
          cluster={cluster}
        />
      )}
    </>
  );
}
