/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { useParams } from 'react-router-dom';
import { Card, Loading } from '@kubed/components';
import {
  workspaceStore,
  networkIPPoolStore,
  FormattedNetworkIPPool,
  Text,
} from '@ks-console/shared';

import { WorkspaceWrapper } from './styles';
import { filter, get, isEmpty } from 'lodash';

function Workspaces() {
  const { name, namespace } = useParams();
  const { useWorkspaces } = workspaceStore;
  const { useGetNetworkIPPool } = networkIPPoolStore;

  const { data: detail = {} as FormattedNetworkIPPool } = useGetNetworkIPPool({
    name,
    namespace,
  });

  const workspacesStatus = get(detail, 'status.workspaces', {});
  const workspaceString = Object.keys(workspacesStatus).join(',');

  const { data: workspaces = [], isLoading: workspaceLoading } = useWorkspaces({
    limit: -1,
    names: workspaceString,
  });

  return workspaceLoading ? (
    <Loading className="page-loading" />
  ) : (
    <Card sectionTitle={t('WORKSPACES')}>
      <WorkspaceWrapper>
        {isEmpty(workspacesStatus) && (
          <div className={'empty'}>{t('IPPOOL_WORKSPACE_EMPTY_TIP')}</div>
        )}
        {Object.keys(workspacesStatus).map((item: any) => {
          const workspace = filter(workspaces, ['name', item])[0] || {};

          return (
            <div key={item} className={'item'}>
              <Text
                icon="enterprise"
                title={item}
                description={workspace.description || t('WORKSPACE')}
              />
              <Text
                title={workspacesStatus[item].allocations}
                description={t('USED_IP_ADDRESSES')}
              />
              <Text title={workspace.manager} description={t('MANAGER')} />
            </div>
          );
        })}
      </WorkspaceWrapper>
    </Card>
  );
}

export default Workspaces;
