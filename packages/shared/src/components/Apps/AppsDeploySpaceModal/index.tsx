/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { omit } from 'lodash';
import { notify } from '@kubed/components';
import { useStore } from '@kubed/stook';
import ChooseSpaceModal from '../AppForms/ChooseSpaceModal';
import { DeployVersionModal } from '../DeployVersionModal';
import DeployYamlModal from '../DeployYamlModal';
import { openpitrixStore } from '../../../stores';
import { useV3action } from '../../../hooks';
import { getRepoAppDisplayName, safeBtoa, getDisplayName } from '../../../utils';
import type { AppDeployFormData, AppDetail } from '../../../types';

interface Props {
  cluster?: string;
  workspace?: string;
  namespace?: string;
  appName: string;
  visible: boolean;
  detail: any;
  versionID?: string;
  onCancel?: () => void;
  success?: (data: any) => void;
}

const { deployApp } = openpitrixStore;
function AppsDeploySpaceModal({
  detail,
  cluster: clusters,
  workspace: workspaces,
  namespace: namespaces,
  onCancel,
  success,
  versionID,
  appName,
  visible,
}: Props) {
  const { cluster = clusters, workspace = workspaces, namespace = namespaces } = useParams();
  const navigate = useNavigate();
  const { open, render: renderEdgeModal } = useV3action();
  const [placementVisible, setPlacementVisible] = useState(false);
  const [appDetail] = useStore<AppDetail>('selectedApp');
  const originalName = getRepoAppDisplayName(appDetail);

  const [placement, setPlacementData] = useState<{
    namespace?: string;
    workspace?: string;
    cluster?: string;
    originalName: string;
  }>({
    cluster: cluster,
    workspace: workspace,
    namespace: namespace,
    originalName,
  });

  useEffect(() => {
    setPlacementData({
      cluster: cluster,
      workspace: workspace,
      namespace: namespace,
      originalName,
    });
  }, [originalName]);
  function OpenEdgeModal(data: any) {
    open({
      action: 'batch.deploy.app.create.v2',
      v3Module: 'edgeStore',
      module: 'edgeappsets',
      originalName,
      ...(detail || detail),
      versionID: versionID || detail.metadata.name,
      ...data,
      appName: appName,
      isManage: !workspace,
      v3StoreParams: {
        module: 'edgeappsets',
      },
      onOK: (value: any) => {
        const labels = value?.metadata?.labels;
        deployApp(value, {
          namespace: labels['kubesphere.io/namespace'],
        }).then((rest: any) => {
          if (rest?.message === 'success') {
            success?.(value);
            onCancel?.();
            notify.success(t('DEPLOYED_SUCCESSFUL'));
            if (location.href.includes('/apps/')) {
              navigate(
                `/${placement.workspace}/clusters/${placement.cluster}/projects/${placement.namespace}/deploy`,
              );
            }
          }
        });
      },
      onCancel: () => {
        onCancel?.();
        setPlacementVisible(false);
      },
      success: (val: any) => {
        const { cluster: c, workspace: w, namespace: n } = val;
        success?.({});
        if (!workspaces) {
          navigate(`/${w}/clusters/${c}/projects/${n}/deploy`);
        }
      },
    });
  }

  useEffect(() => {
    if (visible && cluster && namespace && workspace) {
      if (detail?.spec.appType === 'edge') {
        OpenEdgeModal(placement);
      }
    } else if (visible) {
      setPlacementVisible(true);
    }
  }, [visible, cluster, namespace, workspace, detail]);

  function handleCancel() {
    onCancel?.();
  }

  const handleDeploy = async (data: AppDeployFormData): Promise<void> => {
    const requestParams = {
      kind: 'ApplicationRelease',
      metadata: {
        name: data?.name,
        annotations: {
          ...data.annotations,
          'application.kubesphere.io/app-originalName': originalName || data.originalName,
          'kubesphere.io/description': data.description,
          'kubesphere.io/alias-name': data.displayName,
          'application.kubesphere.io/app-versionName': data.versionName,
          'application.kubesphere.io/app-displayName': getDisplayName(detail),
        },
        labels: {
          'kubesphere.io/namespace': placement.namespace,
          'kubesphere.io/workspace': placement.workspace,
          'kubesphere.io/cluster': placement.cluster,
          'application.kubesphere.io/app-id': appName,
          'application.kubesphere.io/app-type': data.appType,
        },
      },
      spec: {
        appID: appName,
        appType: data.appType,
        appVersionId: data?.versionID,
        values: safeBtoa(data.conf) || data.package,
      },
    };
    deployApp(omit(requestParams, ['cluster', 'workspace', 'namespace']), {
      namespace: placement.namespace,
    }).then((rest: any) => {
      if (rest?.message === 'success') {
        success?.(requestParams);
        handleCancel();
        notify.success(t('DEPLOYED_SUCCESSFUL'));
        if (location.href.includes('/apps/')) {
          navigate(
            `/${placement.workspace}/clusters/${placement.cluster}/projects/${placement.namespace}/deploy`,
          );
        }
      }
    });
  };

  function renderDelopyModal() {
    if (!visible || placementVisible || !placement.namespace) {
      return null;
    }
    if (detail?.spec.appType === 'helm') {
      return (
        <DeployVersionModal
          visible={true}
          initFormData={placement}
          appName={appName}
          versionID={versionID}
          detail={detail}
          onCancel={handleCancel}
          onOk={handleDeploy}
        />
      );
    }
    if (detail?.spec.appType === 'yaml') {
      return (
        <DeployYamlModal
          visible={true}
          // @ts-ignore TODO
          {...placement}
          detail={detail}
          appName={appName}
          versionID={versionID}
          onCancel={handleCancel}
          onOk={handleDeploy}
        />
      );
    }
  }

  return (
    <>
      <ChooseSpaceModal
        defaultVal={{}}
        isEdge={detail?.spec.appType === 'edge'}
        onOk={({ data }: any) => {
          setPlacementVisible(false);
          setPlacementData({ originalName, ...data });
          if (detail?.spec.appType === 'edge') {
            OpenEdgeModal(data);
          }
        }}
        onCancel={() => {
          handleCancel();
          setPlacementVisible(false);
        }}
        visible={placementVisible}
      />
      {renderDelopyModal()}
      {renderEdgeModal()}
    </>
  );
}

export default AppsDeploySpaceModal;
