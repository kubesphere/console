/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Card, Field, LoadingOverlay } from '@kubed/components';
import { hasPermission, monitorStore } from '@ks-console/shared';

import { Wrapper, TopWrapper } from './styles';

const { useFetchStatisticsQuery } = monitorStore;

const DashboardCard = () => {
  const { isLoading, formattedStatistics: data } = useFetchStatisticsQuery({});
  const { workspaces = [], clusters = [] } = globals.user;
  const hideUserAndRole = !(
    hasPermission({ module: 'roles', action: 'global-view-roles' }) ||
    hasPermission({ module: 'users', action: 'global-view-users' })
  );
  const hasWorkspacePermission = hasPermission({
    module: 'workspaces',
    action: 'global-view-workspaces',
  });

  const hasCreateWorkspacePermission = hasPermission({
    module: 'workspaces',
    action: 'global-create-workspaces',
  });

  const hasClusterPermission = hasPermission({
    module: 'clusters',
    action: 'global-view-clusters',
  });
  const hideExtensions = !hasPermission({
    module: 'platform-settings',
    action: 'global-manage-platform-settings',
  });

  const resources = [
    {
      img: '/assets/dashboard-workspace.svg',
      hoverImg: '/assets/dashboard-workspace-hover.svg',
      title: 'PERMISSION_WORKSPACES_MANAGEMENT',
      desc: 'WORKSPACES_MANAGEMENT_DESC',
      name: hideExtensions ? 'VISIBILITY_WORKSPACE' : 'ALL_WORKSPACE',
      link: '/access/workspaces',
      metric: 'platform_workspace_count',
      hide: !hasWorkspacePermission && !hasCreateWorkspacePermission && !workspaces?.length,
    },
    {
      img: '/assets/dashboard-cluster.svg',
      hoverImg: '/assets/dashboard-cluster-hover.svg',
      title: 'CLUSTER_MANAGEMENT',
      desc: 'PLATFORM_CLUSTER_DESC',
      name: hideExtensions ? 'VISIBILITY_CLUSTER' : 'WORKBENCH_ALL_CLUSTER',
      link: '/clusters',
      metric: 'platform_cluster_count',
      hide: !hasClusterPermission && !clusters?.length,
    },
    {
      img: '/assets/dashboard-user.svg',
      hoverImg: '/assets/dashboard-user-hover.svg',
      title: 'USER_AND_ROLE_MANAGEMENT',
      desc: 'USER_AND_ROLE_MANAGEMENT_DESC',
      name: 'ALL_USER',
      link: '/access/accounts',
      metric: 'platform_user_count',
      hide: hideUserAndRole,
    },
    {
      img: '/assets/dashboard-extension.svg',
      hoverImg: '/assets/dashboard-extension-hover.svg',
      title: 'EXTENSIONS_CENTER',
      desc: 'EXTENSION_DESC',
      name: 'INSTALLED_COMPONENT',
      link: '/extensions/manager',
      metric: 'platform_installplan_count',
      label: 'Powered by LuBan',
      hide: hideExtensions,
    },
  ];

  return (
    <Wrapper>
      <TopWrapper>
        {resources.map(resource => {
          const value = get(data, `${resource.metric}.data.result[0].value[1]`, '0');

          return (
            !resource.hide && (
              <Card
                contentClassName="stat-card"
                className="card"
                as={Link}
                to={resource.link}
                style={{
                  width:
                    (resources.length === 3 && resource.name === 'VISIBILITY_WORKSPACE') ||
                    resources.length === 1
                      ? '100%'
                      : 'auto',
                }}
                key={resource.name}
              >
                <Field
                  label={t(resource.desc)}
                  value={
                    <p>
                      {t(resource.title)}
                      {resource.label && <span>{resource.label}</span>}
                    </p>
                  }
                />
                <Field
                  className="numbers"
                  label={value === '1' ? t(resource.name) : t(`${resource.name}_PL`)}
                  value={`${value}`}
                />
                <img src={resource.img} alt="" className="image" />
                <img src={resource.hoverImg} alt="" className="hoverImage" />
              </Card>
            )
          );
        })}
      </TopWrapper>
      <LoadingOverlay visible={isLoading} />
    </Wrapper>
  );
};

export default DashboardCard;
