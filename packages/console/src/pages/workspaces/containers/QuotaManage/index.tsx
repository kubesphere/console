/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { Banner, Loading } from '@kubed/components';
import { Cdn } from '@kubed/icons';

import { getEnabledActions } from '../../utils';
import { workspaceStore } from '@ks-console/shared';
import { ResourceQuota } from './ResourceQuota';
import { Title, LoadingWrapper } from './styles';

import { Embed } from './Embed';

const { useFetchWorkspaceClustersQuery } = workspaceStore;

const IS_USE_V3 = true;

export default function QuotaManage() {
  const params = useParams<'workspace'>();
  const { workspace } = params;
  const enableEdit = getEnabledActions(workspace).includes('edit');
  const { isLoading, formattedClusters } = useFetchWorkspaceClustersQuery({ workspace });

  const content = isLoading ? (
    <LoadingWrapper>
      <Loading />
    </LoadingWrapper>
  ) : (
    <>
      <Title>{t('RESOURCE_QUOTA_PL')}</Title>
      {formattedClusters.map(formattedCluster => (
        <ResourceQuota
          key={formattedCluster.name}
          formattedCluster={formattedCluster}
          enableEdit={enableEdit}
        />
      ))}
    </>
  );

  return (
    <>
      <Banner
        icon={<Cdn />}
        title={t('WORKSPACE_QUOTA_PL')}
        description={t('WORKSPACE_QUOTAS_DESC')}
        className="mb12"
      />

      {IS_USE_V3 ? <Embed /> : content}
    </>
  );
}
