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
  secretStore,
  DetailPageRef,
  useCommonActions,
} from '@ks-console/shared';
import type { FormattedSecret } from '@ks-console/shared';

import { NAME, SECRET_TYPES } from '../constants';
import SecretSettingEditModal from '../../../../components/SecretEditModal';

const PATH = '/clusters/:cluster/projects/:namespace/secrets/:name';

export default function SecretDetail(): JSX.Element {
  const { module, usePutMutation } = secretStore;
  const { cluster, name, namespace } = useParams<'cluster' | 'namespace' | 'name'>();
  const secretSettingEditModal = useDisclosure();
  const ref = useRef<DetailPageRef<FormattedSecret>>(null);
  const { mutate: mutateSecretSettingEdit, isLoading: isEditSecretLoading } = usePutMutation(
    {},
    {
      onSuccess: () => {
        secretSettingEditModal.close();
        notify.success(t('UPDATE_SUCCESSFUL'));
        ref.current?.refetch();
      },
    },
  );

  const navigate = useNavigate();
  const callback = () => {
    navigate(`/clusters/${cluster}/secrets`);
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: secretStore,
    params: { cluster, name, namespace },
    callback: (action: string) => {
      if (action === 'delete') {
        callback();
      } else {
        ref.current?.refetch();
      }
    },
  });

  const tabs = [{ path: `${PATH}/detail`, title: t('DATA') }];

  const attrs = (data: FormattedSecret) => [
    { label: t('CLUSTER_PL'), value: cluster ? cluster : '' },
    { label: t('PROJECT_PL'), value: data?.namespace },
    { label: t('TYPE'), value: t(SECRET_TYPES[data?.type] || data?.type) },
    {
      label: t('CREATION_TIME_TCAP'),
      value: data?.createTime ? formatTime(data?.createTime) : '',
    },
    {
      label: t('CREATOR'),
      value: data?.creator || '',
    },
  ];

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
      key: 'editSecret',
      icon: <Icon name="pen" />,
      text: t('EDIT_SETTINGS'),
      action: 'edit',
      onClick: secretSettingEditModal.open,
    },
    {
      key: 'delete',
      icon: <Icon name="trash" />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: true,
      onClick: (record: FormattedSecret) => del({ ...record, type: NAME }),
    },
  ];

  const handleEditSecret = (info: object) => {
    const detailData = ref.current?.detail;
    const data = merge(omit(detailData?._originData, 'data'), info);

    mutateSecretSettingEdit({
      params: {
        cluster,
        name: detailData?.name,
        namespace: detailData?.namespace,
      },
      data,
    });
  };

  return (
    <>
      <DetailPage<FormattedSecret>
        ref={ref}
        tabs={tabs}
        authKey={module}
        store={secretStore}
        params={{ cluster, name, namespace }}
        sideProps={{
          actions: (data: FormattedSecret) => (data.isFedManaged ? [] : actions),
          attrs,
          icon: <Icon name="key" size={28} style={{ verticalAlign: 'middle' }} />,
          breadcrumbs: {
            label: t('SECRET_PL'),
            url: `/clusters/${cluster}/secrets`,
            listName: 'configuration-secret',
          },
          description: ref.current?.detail.description,
        }}
      />
      {ref.current?.detail && secretSettingEditModal.isOpen && (
        <SecretSettingEditModal
          visible={true}
          isSubmitting={isEditSecretLoading}
          onOk={handleEditSecret}
          onCancel={secretSettingEditModal.close}
          isFederated={false} // todo get isFederated value
          disableSelect={true}
          detail={ref.current.detail}
          cluster={cluster}
        />
      )}
    </>
  );
}
