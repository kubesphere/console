/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useCacheStore as useStore } from '@ks-console/shared';
import { isEmpty, omit, pick } from 'lodash';
import { Loading, notify } from '@kubed/components';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Icon,
  Image,
  formatTime,
  generateId,
  DetailPagee,
  AppDetailStore,
  openpitrixStore,
  transferAppStatus,
  DeleteConfirmModal,
  DeployVersionModal,
  getAppCategoryNames,
  getVersionTypesName,
  getAnnotationsDescription,
} from '@ks-console/shared';
import type { AppDeployFormData, AppDetail } from '@ks-console/shared';

import { getAvatar } from '../../../utils';
import { HelmUploadModal, EditAppModal } from '../../../components/Modals';

const PATH_PREFIX = '/workspaces/:workspace/apps/:appId';

const { useAppDetail, deleteApp, updateApp, deployApp, createVersion } = openpitrixStore;

const LightIcon = styled(Icon)`
  color: hsla(0, 0%, 100%, 0.9);
  fill: hsla(0, 0%, 100%, 0.4);
`;

function AppTemplateDetail(): JSX.Element {
  const navigate = useNavigate();
  const { workspace, cluster, appName } = useParams<'workspace' | 'cluster' | 'appName'>();
  const listUrl = `/workspaces/${workspace}/apps`;
  const [modalType, setModalType] = useStore<string>('modalType', '');
  const [versions] = useStore('versions');
  const [appDetail, setAppDetail] = useStore<AppDetailStore>('appDetail');
  const initFormData: AppDeployFormData = useMemo(() => {
    return {
      name:
        `${appDetail?.metadata.name
          .slice(0, 7)
          .toLowerCase()
          .replaceAll(' ', '-')}-${generateId()}` || '',
      version_id: versions?.items[0]?.version_id ?? '',
      cluster,
      workspace,
    };
  }, [appDetail?.metadata.name, versions?.items, workspace, cluster]);
  const {
    data: detail,
    isLoading,
    refetch: refetchAppDetails,
  } = useAppDetail(
    { workspace, appName },
    { onSuccess: appDetails => setAppDetail({ ...appDetails, refetchAppDetails }) },
  );
  const tabs = [
    {
      title: 'VERSIONS',
      path: `${PATH_PREFIX}/versions`,
    },
    {
      title: 'APP_REVIEW',
      path: `${PATH_PREFIX}/audit-records`,
    },
    {
      title: 'APP_INSTANCES',
      path: `${PATH_PREFIX}/app-instances`,
    },
  ];
  const attrs = [
    {
      label: t('STATUS'),
      value: transferAppStatus(detail?.status.state || '-'),
    },
    {
      label: t('TYPE'),
      // TODO 字段缺失
      value: getVersionTypesName(detail?.spec.appType || ''),
    },
    {
      label: t('CATEGORY'),
      value: t(
        // TODO 缺失字段 category_set
        `APP_CATE_${getAppCategoryNames([])
          .toUpperCase()
          .replace(/[^A-Z]+/g, '_')}`,
        {
          // TODO category_set
          defaultValue: getAppCategoryNames([]),
        },
      ),
    },
    {
      label: t('WORKSPACE'),
      value: detail?.metadata.labels?.['kubesphere.io/workspace'] || '-',
    },
    {
      label: t('CREATION_TIME_TCAP'),
      value: formatTime(
        detail?.metadata.creationTimestamp || new Date().toLocaleString(),
        'YYYY-MM-DD HH:mm:ss',
      ),
    },
  ];
  const actions = [
    {
      key: 'editApp',
      type: 'control',
      text: t('EDIT'),
      action: 'manage',
      show: true,
      onClick: () => setModalType('edit'),
      props: {
        color: 'secondary',
      },
    },
    {
      key: 'appDeploy',
      icon: <LightIcon name="snapshot" />,
      text: t('INSTALL'),
      action: 'manage',
      onClick: () => setModalType('deploy'),
    },
    {
      key: 'addVersion',
      icon: <LightIcon name="tag" />,
      text: t('UPLOAD_NEW_VERSION'),
      action: 'manage',
      onClick: () => setModalType('upload'),
    },
    {
      key: 'delete',
      icon: <LightIcon name="trash" />,
      text: t('DELETE'),
      action: 'manage',
      onClick: () => setModalType('delete'),
    },
  ];

  function closeModal(): void {
    setModalType('');
  }

  async function handleEditOk(data: Partial<AppDetail>): Promise<void> {
    const pathParam = pick(data, ['app_id', 'workspace']);
    const patchData = omit(data, ['app_id', 'workspace']);

    await updateApp(pathParam, patchData);
    closeModal();
    notify.success(t('MODIFY_SUCCESSFUL'));
    appDetail.refetchAppDetails?.();
  }

  async function handleDelete(): Promise<void> {
    await deleteApp({ workspace, appName });
    closeModal();
    notify.success(t('DELETED_SUCCESSFULLY'));
    navigate(listUrl);
  }

  async function handleOk(fileData: any): Promise<void> {
    await createVersion({ appName }, fileData);
    closeModal();
    notify.success(t('ADD_VERSION_SUCCESSFUL'));
    versions.refetchVersions();
  }

  async function handleDeploy(data: AppDeployFormData): Promise<void> {
    const { cluster: selectCluster, workspace: selectWorkspace, namespace, ...basicData } = data;
    await deployApp(basicData, { cluster: selectCluster, workspace: selectWorkspace, namespace });
    closeModal();
    notify.success(t('DEPLOYED_SUCCESSFUL'));
  }

  if (isLoading) {
    return <Loading className="page-loading" />;
  }

  return (
    <>
      <DetailPagee
        tabs={tabs}
        cardProps={{
          name: detail?.metadata.name,
          desc: getAnnotationsDescription(detail),
          icon: (
            <Image
              alt=""
              className="mr12"
              src={getAvatar(detail?.spec.icon || '')}
              iconSize={32}
              iconLetter={detail?.metadata.name}
            />
          ),
          authKey: 'app-templates',
          params: { workspace },
          actionOptions: { limit: 2, theme: 'dark' },
          attrs,
          actions,
          breadcrumbs: {
            label: t('APP_TEMPLATE_PL'),
            url: listUrl,
          },
        }}
      />
      {modalType === 'upload' && (
        <HelmUploadModal
          visible={true}
          title={t('UPLOAD_NEW_VERSION')}
          description={t('UPLOAD_NEW_VERSION_DESC')}
          onCancel={closeModal}
          type="ADD_VERSION"
          workspace={workspace}
          onOk={handleOk}
        />
      )}
      {modalType === 'delete' && (
        <DeleteConfirmModal
          visible={true}
          type="APP_TEMPLATE"
          resource={[appDetail.metadata.name || '']}
          tip={t(`DELETE_APP_TEMPLATE_${isEmpty(versions.items) ? '' : 'VERSIONS_'}DESC`, {
            resource: appDetail?.metadata.name,
          })}
          onOk={handleDelete}
          onCancel={closeModal}
        />
      )}
      {modalType === 'deploy' && (
        <DeployVersionModal
          appName={appName}
          visible={true}
          initFormData={initFormData}
          detail={appDetail as any}
          onCancel={closeModal}
          onOk={handleDeploy}
        />
      )}
      {modalType === 'edit' && (
        <EditAppModal detail={appDetail} visible={true} onCancel={closeModal} onOk={handleEditOk} />
      )}
    </>
  );
}

export default AppTemplateDetail;
