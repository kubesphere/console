import React from 'react';
import { find } from 'lodash';

import type { FormattedInstallPlan } from '../../../../../stores/extension';
import { useLogQuery } from '../../../../../stores/extension';
import type { FormattedCluster } from '../../../../../stores/cluster';
import { LogViewer } from '../LogViewer';
import { LogViewerWrapper, LogViewerTitle } from './ClusterLog.styles';

interface ClusterLogProps {
  formattedCluster: FormattedCluster;
  formattedInstallPlan: FormattedInstallPlan;
}

function ClusterLog({ formattedCluster, formattedInstallPlan }: ClusterLogProps) {
  const clusterName = formattedCluster.name;
  const { isUninstall, clusterSchedulingStatuses } = formattedInstallPlan;
  const clusterSchedulingStatus = find(clusterSchedulingStatuses, { clusterName });
  const targetNamespace = clusterSchedulingStatus?.targetNamespace;
  const jobName = clusterSchedulingStatus?.jobName;

  const { data } = useLogQuery({ targetNamespace, jobName });
  const log = data.log;

  return (
    <LogViewerWrapper>
      <LogViewerTitle>
        {clusterName} {t(isUninstall ? 'UNINSTALLATION_LOG' : 'INSTALLATION_LOG')}
      </LogViewerTitle>
      <LogViewer log={log} bodyStyle={{ height: '608px' }} />
    </LogViewerWrapper>
  );
}

export { ClusterLog };
