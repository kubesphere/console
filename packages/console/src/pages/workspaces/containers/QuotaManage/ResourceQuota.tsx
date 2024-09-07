/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@kubed/components';

import type { FormattedCluster } from '@ks-console/shared';
import {
  isMultiCluster as getIsMultiCluster,
  compareVersion,
  workspaceQuotaStore,
  Panel,
  ClusterTitle,
} from '@ks-console/shared';

import { REQUIRED_VERSION, WORKSPACE_QUOTAS_MAP, RESERVED_KEYS } from './constants';
import { QuotaItem } from './QuotaItem';
import { Cluster, ClusterWrapper, DisabledTip, Content } from './ResourceQuota.styles';

const { useFetchWorkspaceResourceQuotaQuery } = workspaceQuotaStore;

interface ResourceQuotaProps {
  formattedCluster: FormattedCluster;
  enableEdit: boolean;
}

export function ResourceQuota({ formattedCluster, enableEdit }: ResourceQuotaProps) {
  const isMultiCluster = getIsMultiCluster();
  const needUpgrade =
    compareVersion(
      isMultiCluster ? formattedCluster.configz.ksVersion : window.globals.ksConfig.ksVersion,
      REQUIRED_VERSION,
    ) < 0;

  const { workspace } = useParams<'workspace'>();

  const { workspaceResourceQuotaDetail } = useFetchWorkspaceResourceQuotaQuery({
    enabled: !needUpgrade && Boolean(workspace),
    cluster: formattedCluster.name,
    workspace,
    name: workspace ?? '',
  });
  const items = Object.entries(WORKSPACE_QUOTAS_MAP)
    .map(([key, value]) => ({
      key,
      name: key,
      total: workspaceResourceQuotaDetail?.spec?.quota?.hard?.[value.name],
      used: (workspaceResourceQuotaDetail?.status?.total?.used?.[value.name] as number) ?? 0,
    }))
    .filter(({ total, used, name }) => {
      if (!total && !Number(used) && RESERVED_KEYS.indexOf(name) === -1) {
        return false;
      }

      return true;
    });

  if (needUpgrade) {
    return (
      <Panel>
        <ClusterWrapper>
          <Cluster>
            <ClusterTitle
              theme="light"
              width="100%"
              cluster={formattedCluster}
              noStatus={!isMultiCluster}
            />
          </Cluster>
          <DisabledTip>{t('CLUSTER_UPGRADE_REQUIRED', { version: REQUIRED_VERSION })}</DisabledTip>
        </ClusterWrapper>
      </Panel>
    );
  }

  return (
    <Panel>
      <ClusterWrapper>
        <Cluster>
          <ClusterTitle
            theme="light"
            width="100%"
            cluster={formattedCluster}
            noStatus={!isMultiCluster}
          />
        </Cluster>
        {/* TODO: missing action */}
        {enableEdit && <Button>{t('EDIT_QUOTAS')}</Button>}
      </ClusterWrapper>
      <Content>
        {items.map(item => (
          <QuotaItem {...item} />
        ))}
      </Content>
    </Panel>
  );
}
