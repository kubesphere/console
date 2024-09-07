/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { merge } from 'lodash';
import { notify } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Icon,
  formatTime,
  DetailPage,
  DetailPageRef,
  useCommonActions,
  serviceAccountStore,
} from '@ks-console/shared';
import type { FormattedServiceAccount } from '@ks-console/shared';

import { NAME } from '../constants';
import ModifyServiceAccountRole from '../ModifyRole';

const PATH = '/clusters/:cluster/projects/:namespace/serviceaccounts/:name';

export default function ServiceAccountDetail() {
  const { cluster, name, namespace } = useParams<'cluster' | 'name' | 'namespace'>();
  const { module, usePatchMutation } = serviceAccountStore;
  const ref = useRef<DetailPageRef<FormattedServiceAccount>>(null);
  const editRoleModal = useDisclosure();
  const tabs = [{ path: `${PATH}/detail`, title: t('DATA') }];

  const attrs = (data: FormattedServiceAccount) => [
    { label: t('CLUSTER_PL'), value: cluster ? cluster : '' },
    { label: t('PROJECT_PL'), value: data?.namespace },
    { label: t('ROLE_PL'), value: data?.role },
    {
      label: t('CREATION_TIME_TCAP'),
      value: data?.createTime ? formatTime(data?.createTime) : '',
    },
    {
      label: t('CREATOR'),
      value: data?.creator || '',
    },
  ];

  const navigate = useNavigate();
  const callback = () => {
    navigate(`/clusters/${cluster}/serviceaccounts`);
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: serviceAccountStore,
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
      key: 'modify',
      icon: <Icon name="pen" />,
      text: t('CHANGE_ROLE'),
      action: 'edit',
      onClick: editRoleModal.open,
    },
    {
      key: 'delete',
      icon: <Icon name="trash" />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: true,
      onClick: (record: FormattedServiceAccount) => del({ ...record, type: NAME }),
    },
  ];

  const { mutate: mutateEditServiceAccountRole, isLoading: isEditRoleLoading } = usePatchMutation(
    {},
    {
      onSuccess: () => {
        editRoleModal.close();
        notify.success(t('UPDATE_SUCCESSFUL'));
        ref.current?.refetch();
      },
    },
  );

  const handleEditRole = (info: object) => {
    const detailData = ref.current?.detail;
    const data = merge(detailData?._originData, info);

    mutateEditServiceAccountRole({
      params: {
        cluster: detailData?.cluster,
        name: detailData?.name,
        namespace: detailData?.namespace,
      },
      data,
    });
  };

  return (
    <>
      <DetailPage<FormattedServiceAccount>
        ref={ref}
        tabs={tabs}
        authKey={module}
        store={serviceAccountStore}
        params={{ cluster, name, namespace }}
        sideProps={{
          actions,
          attrs,
          icon: <Icon name="client" size={28} style={{ verticalAlign: 'middle' }} />,
          breadcrumbs: {
            label: t('SERVICE_ACCOUNT_PL'),
            url: `/clusters/${cluster}/serviceaccounts`,
          },
          description: ref.current?.detail.description,
        }}
      />
      {ref.current?.detail && editRoleModal.isOpen && (
        <ModifyServiceAccountRole
          detail={ref.current.detail}
          visible={true}
          onCancel={editRoleModal.close}
          initialValue={ref.current.detail._originData}
          confirmLoading={isEditRoleLoading}
          onOk={handleEditRole}
        />
      )}
    </>
  );
}
