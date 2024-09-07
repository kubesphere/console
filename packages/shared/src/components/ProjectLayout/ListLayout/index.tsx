/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo } from 'react';
import { Outlet, useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCacheStore as useStore } from '../../../index';
import { useModal } from '@kubed/components';
import { Project, Enterprise } from '@kubed/icons';
import { NavMenu } from '../../Layouts/NavMenu';
import NavTitle from '../../Layouts/NavTitle';

import { FavoriteHistory } from '../../FavoriteHistory';
import ListPageSide from '../../Layouts/ListPageSide';
import { ListPageMain } from '../../Layouts/ListPageMain';
import { getActions } from '../../../utils';
import type { FormattedNamespace } from '../../../types';
import { useGlobalStore, workspaceStore, permissionStore, projectNewStore } from '../../../stores';

import ProjectsSelectorModal from '../ProjectsSelectorModal';

const { useFetchWorkspaceQuery } = workspaceStore;
const { useQueryDetail } = projectNewStore;

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  & > span {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const navKey = 'PROJECT_NAV';

function ListLayout(): JSX.Element {
  const location = useLocation();
  const modal = useModal();
  const navigate = useNavigate();
  const { getNav, setNav } = useGlobalStore();
  const { cluster, workspace, namespace } = useParams();
  const [defaultProjectDetail] = useStore<FormattedNamespace>('project');
  const [, setWujieUrlPrefix] = useStore<string>('wujieUrlPrefix');
  const prefix = useMemo(
    () => `/${workspace}/clusters/${cluster}/projects/${namespace}`,
    [cluster, workspace, namespace],
  );
  const { getProjectNavs } = permissionStore();
  const { workspaceDetail } = useFetchWorkspaceQuery({
    workspace: workspace ?? '',
    cluster,
    enabled: Boolean(workspace),
  });
  const { data: projectDetail = defaultProjectDetail } = useQueryDetail<FormattedNamespace>(
    {
      cluster,
      name: namespace,
    },
    { enabled: !defaultProjectDetail?.name },
  );

  const enableActions: Record<string, string[]> = {
    projects: getActions({ workspace, module: 'projects' }),
    federatedprojects: getActions({
      workspace,
      module: 'federatedprojects',
    }),
    devops: getActions({ workspace, module: 'devops' }),
  };
  let navs = getNav(navKey);

  function handleSelect(modalId: string, url?: string): void {
    if (url) {
      navigate(url);
      modal.close(modalId);
    }
  }

  function openProjectsSelector() {
    const modalId = modal.open({
      titleIcon: <Enterprise size={40} />,
      title: (
        <Link to={`/workspaces/${workspace}`} onClick={() => modal.close(modalId)}>
          {workspace}
        </Link>
      ),
      description: workspaceDetail?.description || t('WORKSPACE'),
      footer: null,
      width: 960,
      content: (
        <ProjectsSelectorModal
          cluster={cluster || ''}
          workspace={workspace || ''}
          enableActions={enableActions}
          onSelect={url => handleSelect(modalId, url)}
        />
      ),
    });
  }

  useEffect(() => {
    navs = getProjectNavs({ cluster, workspace, project: namespace });
    if (navs.length !== 0) {
      setNav(navKey, navs);
    }
  }, []);

  useEffect(() => {
    setWujieUrlPrefix(`//${window.location.host}/consolev3${prefix}`);
  }, [prefix]);

  const title = projectDetail?.aliasName
    ? `${projectDetail?.aliasName}（${projectDetail?.name}）`
    : projectDetail?.name;
  return (
    <>
      <ListPageSide>
        <NavTitle
          icon={<Project variant="light" size={40} />}
          title={
            (
              <TitleWrapper>
                <span title={title}>{title}</span>
                {projectDetail && (
                  <FavoriteHistory
                    user={globals.user.username}
                    item={{
                      id: projectDetail?.uid || '',
                      name: projectDetail?.name || '',
                      url: `/${workspace}/clusters/${cluster}/projects/${projectDetail?.name}`,
                      type: 'Project',
                    }}
                    iconTheme="light"
                  />
                )}
              </TitleWrapper>
            ) as unknown as string
          }
          subtitle={projectDetail?.description || t('PROJECT')}
          style={{ marginBottom: '20px' }}
          onClick={openProjectsSelector}
        />
        <NavMenu navs={navs} prefix={prefix} pathname={location.pathname} />
      </ListPageSide>
      <ListPageMain>
        <Outlet />
      </ListPageMain>
    </>
  );
}

export default ListLayout;
