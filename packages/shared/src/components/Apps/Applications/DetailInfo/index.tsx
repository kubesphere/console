/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { get, isEmpty, last } from 'lodash';
import { useQuery } from 'react-query';
import { Pen, Trash } from '@kubed/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading, notify } from '@kubed/components';
import { ClusterAliasName, ProjectAliasName } from '@ks-console/shared';
import { useCacheStore as useStore } from '../../../../index';
import Image from '../../../Image';
import { DetailPagee } from '../../../DetailPage';
import { DeleteConfirmModal } from '../../../Modals/DeleteConfirm';
import OPAppEditModal from '../AppTypeTable/OPAppTable/OPAppEditModal';
import OPTemplateEditModal from '../AppTypeTable/OPAppTable/OPTemplateEditModal';
import { formatTime, getDisplayName, getAnnotationsName } from '../../../../utils';
import { openpitrixStore } from '../../../../stores';
import { DetailAction } from '../../../../hooks/useActions/utils';
import { AppStatusWithLogInfo } from '../../AppStatusWithLogInfo';

const { fetchApplicationDetail, deleteOPApp, patchOPApp, upgradeOPApp, useAppVersionList } =
  openpitrixStore;

function DetailInfo(): JSX.Element {
  const navigate = useNavigate();
  const [hasEdgeDeployments] = useStore<boolean>('hasEdgeDeployments');
  const [modalType, setModalType] = useState<string>('');
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [, setAppDetail] = useStore<any>('appDetail');
  const { workspace, namespace, cluster, appName } = useParams();
  const {
    data: detail,
    isLoading,
    refetch,
  } = useQuery(['apps', 'detail', appName], () => fetchApplicationDetail({ namespace, appName }), {
    enabled: !!appName,
    onSuccess: setAppDetail,
  });
  const { data: versions } = useAppVersionList({ appName: detail?.spec?.appID });
  const mutateData = useMemo(() => {
    if (!detail) {
      return {};
    }

    return {
      // workspace,
      namespace,
      // cluster,
      appName: appName,
      cluster_id: detail.cluster_id,
    };
  }, [detail]);

  const tabs = [
    {
      path: `resource-status`,
      title: t('RESOURCE_STATUS'),
    },
    {
      path: `template`,
      title: t('APP_TEMPLATE'),
    },
    {
      path: `config`,
      title: t('APP_SETTINGS'),
    },
  ];

  function getActions() {
    const actions: DetailAction[] = [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'namespace-create-app-releases',
        show: true,
        onClick: () => setModalType('edit'),
      },
      {
        key: 'editRole',
        icon: <Pen />,
        text: t('EDIT_SETTINGS'),
        action: 'namespace-create-app-releases',
        show: true,
        onClick: () => setModalType('editeOPTemplate'),
      },
    ];
    if (!hasEdgeDeployments) {
      actions.push({
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'namespace-delete-app-releases',
        type: 'danger',
        show: true,
        onClick: () => {
          setModalType('delete');
        },
      });
    }
    return actions;
  }

  function getAttrs(): any {
    if (isEmpty(detail)) {
      return;
    }
    const fullCluster = cluster || detail.labels['kubesphere.io/cluster'];

    const appAliasName = detail?.metadata.annotations?.['application.kubesphere.io/app-alias-name'];
    return [
      {
        label: t('CLUSTER'),
        value: <ClusterAliasName cluster={fullCluster} />,
      },
      {
        label: t('PROJECT'),
        value: <ProjectAliasName project={namespace} />,
      },
      {
        label: t('STATUS'),
        value: (
          <AppStatusWithLogInfo
            status={detail.status}
            showLogInfo={get(detail, 'spec.appType', '') === 'helm'}
            jobName={get(detail, '_status.installJobName', '')}
            message={get(detail, '_status.message', '')}
            cluster={get(detail, 'metadata.labels.["kubesphere.io/cluster"]', '')}
            namespace={get(detail, 'metadata.labels.["kubesphere.io/namespace"]', '')}
          />
        ),
      },
      {
        label: t('APPLICATION'),
        value: appAliasName ? `${appAliasName}（${detail.spec.appID}）` : detail.spec.appID,
      },
      {
        label: t('VERSION'),
        value:
          getAnnotationsName(detail, 'application.kubesphere.io/app-versionName') ||
          last(detail.spec?.appVersionID?.split('-')),
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
        value: getAnnotationsName(detail, 'kubesphere.io/creator'),
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
      const urlPrefix = `/${workspace}/clusters/${cluster}/projects/${namespace}`;
      navigate(`${urlPrefix}/deploy`);
    }
  }

  async function handleEdit(patchData: Record<string, string>): Promise<void> {
    if (!isEmpty(mutateData)) {
      setIsMutating(true);
      await patchOPApp({
        ...mutateData,
        params: patchData,
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
          actions: getActions(),
          params: { workspace },
          actionOptions: { theme: 'dark' },
          breadcrumbs: {
            label: t('APP_PL'),
            url: workspace
              ? `/${workspace}/clusters/${cluster}/projects/${namespace}/deploy`
              : '/apps-manage/deploy',
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
