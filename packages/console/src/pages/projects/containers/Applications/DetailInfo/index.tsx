/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { useQuery } from 'react-query';
import { useCacheStore as useStore } from '@ks-console/shared';
import { Pen, Trash } from '@kubed/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading, notify, Tooltip } from '@kubed/components';
import {
  Image,
  DetailPagee,
  formatTime,
  getDisplayName,
  StatusIndicator,
  openpitrixStore,
  DeleteConfirmModal,
  ClusterAliasName,
  ProjectAliasName,
} from '@ks-console/shared';

import { OPAppEditModal, OPTemplateEditModal } from '../../../components';

const { fetchApplicationDetail, deleteOPApp, patchOPApp, upgradeOPApp, useAppVersionList } =
  openpitrixStore;

const PATH_PREFIX =
  '/:workspace/clusters/:cluster/projects/:namespace/applications/:appType/:appName';

function DetailInfo(): JSX.Element {
  const navigate = useNavigate();
  const [urlPrefix] = useStore<string>('wujieUrlPrefix');
  const [modalType, setModalType] = useState<string>('');
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [, setAppDetail] = useStore<any>('appDetail');
  const { workspace, namespace, cluster, appName } = useParams();
  const {
    data: detail,
    isLoading,
    refetch,
  } = useQuery(
    ['apps', 'detail', appName],
    () => fetchApplicationDetail({ workspace, namespace, cluster, appName }),
    {
      enabled: !!appName,
      onSuccess: setAppDetail,
    },
  );
  const { data: versions } = useAppVersionList({ appName: detail?.metadata.name });
  const mutateData = useMemo(() => {
    if (!detail) {
      return {};
    }

    return {
      workspace,
      namespace,
      cluster,
      zone: detail.zone,
      cluster_id: detail.cluster_id,
    };
  }, [detail]);
  const tabs = [
    {
      path: `${PATH_PREFIX}/resource-status`,
      title: t('RESOURCE_STATUS'),
    },
    {
      path: `${PATH_PREFIX}/template`,
      title: t('APP_TEMPLATE'),
    },
    {
      path: `${PATH_PREFIX}/config`,
      title: t('APP_SETTINGS'),
    },
  ];
  const actions = [
    {
      key: 'edit',
      icon: <Pen />,
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      show: true,
      onClick: () => setModalType('edit'),
    },
    {
      key: 'editRole',
      icon: <Pen />,
      text: t('EDIT_SETTINGS'),
      action: 'edit',
      show: true,
      onClick: () => setModalType('editeOPTemplate'),
    },
    {
      key: 'delete',
      icon: <Trash />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: true,
      onClick: () => setModalType('delete'),
    },
  ];

  function getAttrs(): any {
    if (isEmpty(detail)) {
      return;
    }

    return [
      {
        label: t('CLUSTER'),
        value: <ClusterAliasName cluster={cluster} />,
      },
      {
        label: t('PROJECT'),
        value: <ProjectAliasName project={namespace} />,
      },
      {
        label: t('STATUS'),
        value: detail.additional_info ? (
          <Tooltip content={detail.additional_info}>
            <StatusIndicator type={detail.status}>{t(detail.status)}</StatusIndicator>
          </Tooltip>
        ) : (
          <StatusIndicator type={detail.status}>{t(detail.status)}</StatusIndicator>
        ),
      },
      {
        label: t('VERSION'),
        value: get(detail, 'version.name', '-'),
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: formatTime(get(detail, 'create_time'), 'YYYY-MM-DD HH:mm:ss'),
      },
      {
        label: t('UPDATE_TIME_TCAP'),
        value: formatTime(get(detail, 'status_time'), 'YYYY-MM-DD HH:mm:ss'),
      },
      {
        label: t('CREATOR'),
        value: detail.owner || '-',
      },
    ];
  }

  function closeModal(): void {
    setModalType('');
  }

  function onMutateSuccess(text?: string): void {
    setIsMutating(false);
    closeModal();
    notify.success(text || t('UPDATE_SUCCESSFUL'));
  }

  async function handleDelete(): Promise<void> {
    if (!isEmpty(mutateData)) {
      setIsMutating(true);
      await deleteOPApp(mutateData);
      onMutateSuccess(t('DELETED_SUCCESSFUL'));
      navigate(`${urlPrefix}/applications`);
    }
  }

  async function handleEdit(patchData: Record<string, string>): Promise<void> {
    if (!isEmpty(mutateData)) {
      setIsMutating(true);
      await patchOPApp({
        ...mutateData,
        ...patchData,
      });
      onMutateSuccess();
      refetch();
    }
  }

  async function handleEditTemplate(patchData: Record<string, any>): Promise<void> {
    if (!isEmpty(mutateData)) {
      setIsMutating(true);
      await upgradeOPApp(mutateData, patchData);
      onMutateSuccess();
      refetch();
    }
  }

  if (isLoading) {
    return <Loading className="page-loading" />;
  }

  return (
    <>
      <DetailPagee
        tabs={tabs}
        cardProps={{
          name: getDisplayName(detail),
          desc: detail?.description,
          authKey: 'applications',
          icon: (
            <Image
              iconSize={32}
              iconLetter={get(detail, 'app.name')}
              src={get(detail, 'app.icon')}
              alt=""
            />
          ),
          attrs: getAttrs(),
          actions,
          params: { workspace },
          actionOptions: { theme: 'dark' },
          breadcrumbs: {
            label: t('APP_PL'),
            url: `/${workspace}/clusters/${cluster}/projects/${namespace}/applications`,
          },
        }}
      />
      {modalType === 'edit' && (
        <OPAppEditModal
          visible={true}
          appDetail={detail}
          onOk={handleEdit}
          onCancel={closeModal}
          isUpdating={isMutating}
        />
      )}
      {modalType === 'delete' && (
        <DeleteConfirmModal
          type="APP"
          visible={true}
          resource={detail.name}
          onOk={handleDelete}
          onCancel={closeModal}
          confirmLoading={isMutating}
        />
      )}
      {modalType === 'editeOPTemplate' && (
        <OPTemplateEditModal
          visible={true}
          detail={detail}
          versions={versions}
          onOk={handleEditTemplate}
          onCancel={closeModal}
        />
      )}
    </>
  );
}

export default DetailInfo;
