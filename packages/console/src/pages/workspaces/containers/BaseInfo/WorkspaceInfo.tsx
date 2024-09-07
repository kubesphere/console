/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import { notify } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';

import {
  formatTime,
  hasPermission,
  workspaceStore,
  Panel,
  Icon,
  useActionMenu,
  useCommonActions,
  monitorStore,
  removeDashboardHistory,
  getUserAliasName,
} from '@ks-console/shared';

import { WorkspaceManagerField } from '../../components/WorkspaceBasicInfoForm';
import { DeleteWorkspaceModal } from '../../components/Modals';
import {
  Content,
  Header,
  HeaderField,
  HeaderNameField,
  ContentField,
} from './WorkspaceInfo.styles';

const { useFetchWorkspaceQuery, useDeleteMutation: useDeleteWorkspaceMutation } = workspaceStore;
const { useFetchStatisticsQuery } = monitorStore;

export function WorkspaceInfo() {
  const params = useParams<'cluster' | 'workspace'>();
  const navigate = useNavigate();
  const { workspace, cluster } = params;

  const deleteWorkspaceModal = useDisclosure();

  const isViewWorkspaceProjects = hasPermission({
    module: 'projects',
    action: 'view',
    workspace,
  });

  const {
    isLoading,
    workspaceDetail,
    refetch: refetchWorkspaceDetail,
  } = useFetchWorkspaceQuery({
    workspace: workspace ?? '',
    cluster,
    enabled: Boolean(workspace),
  });

  const { formattedStatistics } = useFetchStatisticsQuery({
    workspace: workspace ?? '',
  });

  const deleteWorkspaceMutation = useDeleteWorkspaceMutation({
    onSuccess: () => {
      notify.success(t('DELETED_SUCCESSFULLY'));
      navigate('/');
    },
  });

  const { editBaseInfo } = useCommonActions({
    store: workspaceStore,
    params: { cluster, name: workspace },
    callback: type => {
      if (type === 'editBaseInfo') {
        refetchWorkspaceDetail();
      }
    },
  });
  const renderActionMenu = useActionMenu({
    mode: 'dropdown',
    authKey: 'workspace-settings',
    params: { workspace },
    autoSingleButton: true,
    actions: [
      {
        key: 'resource.baseinfo.edit',
        action: 'manage',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        onClick: record =>
          editBaseInfo({
            ...record,
            extraForm: (
              <WorkspaceManagerField manager={get(workspaceDetail, 'spec.template.spec.manager')} />
            ),
          }),
      },
      {
        key: 'workspace.delete',
        action: 'manage',
        icon: <Icon name="trash" />,
        text: t('DELETE_WORKSPACE'),
        show: globals.clusterRole !== 'member',
        onClick: () => deleteWorkspaceModal.open(),
      },
    ],
    dropdownTheme: 'dark',
    dropdownType: 'text',
    dropdownText: t('MANAGE'),
  });

  const getMetrics = () => {
    const metrics: Record<string, string> = {};

    Object.entries(formattedStatistics).forEach(([key, value]) => {
      metrics[key] = value?.data?.result?.[0]?.value?.[1] ?? '0';
    });

    return metrics;
  };

  const getResourceOptions = () => {
    const metrics = getMetrics();
    return [
      // {
      //   icon: 'project',
      //   value: metrics.workspace_namespace_count,
      //   label: metrics.workspace_namespace_count === '1' ? t('PROJECT') : t('PROJECTS'),
      // },
      // {
      //   icon: 'strategy-group',
      //   value: metrics.workspace_devops_project_count,
      //   label:
      //     metrics.workspace_devops_project_count === '1'
      //       ? t('DEVOPS_PROJECT_LOW')
      //       : t('DEVOPS_PROJECT_LOW_PL'),
      //   isHidden: !hasKSModule('devops'),
      // },
      {
        icon: 'human',
        value: metrics.workspace_workspacerolebinding_count,
        label:
          metrics.workspace_workspacerolebinding_count === '1'
            ? t('WS_MEMBER_SCAP')
            : t('WS_MEMBER_SCAP_PL'),
      },
    ];
  };

  return (
    <>
      <Panel loading={isLoading} title={t('WORKSPACE_INFO')}>
        <Header>
          <HeaderNameField
            avatar={<Icon size={40} name="enterprise" />}
            value={
              workspaceDetail?.aliasName
                ? `${workspaceDetail?.aliasName}（${workspaceDetail.name}）`
                : workspaceDetail?.name
            }
            label={workspaceDetail?.description || t('WORKSPACE')}
          />
          <HeaderField value={getUserAliasName(workspaceDetail?.manager)} label={t('MANAGER')} />
          <HeaderField
            value={workspaceDetail?.createTime ? formatTime(workspaceDetail?.createTime) : '-'}
            label={t('CREATION_TIME')}
          />
          {renderActionMenu(workspaceDetail ?? {})}
        </Header>
        {isViewWorkspaceProjects && (
          <Content>
            {getResourceOptions().map(option => (
              <ContentField
                key={option.label}
                avatar={<Icon size={40} name={option.icon} />}
                value={option.value}
                label={option.label}
              />
            ))}
          </Content>
        )}
      </Panel>
      {deleteWorkspaceModal.isOpen && (
        <DeleteWorkspaceModal
          visible={deleteWorkspaceModal.isOpen}
          type={workspaceStore.name}
          resource={workspaceDetail?.name}
          confirmLoading={deleteWorkspaceMutation.isLoading}
          onOk={(_event, data) => {
            const { shouldDeleteResource } = data;
            const variables = { ...workspaceDetail, shouldDeleteResource };
            deleteWorkspaceMutation.mutate(variables);
            removeDashboardHistory(globals.user.username, workspaceDetail?.uid!);
          }}
          onCancel={deleteWorkspaceModal.close}
        />
      )}
    </>
  );
}
