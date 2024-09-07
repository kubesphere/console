/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect, useRef } from 'react';
import { find } from 'lodash';

import type { ModalProps } from '@kubed/components';
import { Tab } from '@kubed/components';
import { Proportion } from '@kubed/icons';

import type { FormattedExtension, FormattedInstallPlan } from '../../../../../stores/extension';
import { useExtensionInstalledClustersQuery } from '../../../../../stores/extension';
import type { FormattedCluster } from '../../../../../stores/cluster';
import { Progress } from './Progress';
import { ClusterTabLabel } from './ClusterTabLabel';
import { ClusterLog } from './ClusterLog';
import {
  StyledModal,
  Wrapper,
  Overview,
  ProgressWrapper,
  ProgressTextWrapper,
  ProgressText,
  StyledTabs,
} from './ClusterLogsModal.styles';

interface ClusterLogsModalProps extends Pick<ModalProps, 'visible' | 'onCancel'> {
  formattedExtension: FormattedExtension;
  formattedInstallPlan: FormattedInstallPlan | undefined;
}

function ClusterLogsModal({
  visible,
  formattedExtension,
  formattedInstallPlan,
  onCancel,
}: ClusterLogsModalProps) {
  const extensionName = formattedExtension.name;
  const clusters = formattedInstallPlan?.clusterScheduling?.placement?.clusters ?? [];
  const clusterSchedulingStatuses = formattedInstallPlan?.clusterSchedulingStatuses ?? [];
  const isUninstall = formattedInstallPlan?.isUninstall;
  const clusterCount = clusters.length;
  const clusterInstalledCount = clusterSchedulingStatuses.filter(
    ({ isInstalled }) => isInstalled,
  ).length;

  const isUninstallRef = useRef(isUninstall);

  const { isSuccess, installedFormattedClusters } = useExtensionInstalledClustersQuery({
    extensionName,
  });
  const [selectedFormattedCluster, setSelectedFormattedCluster] = useState<FormattedCluster>();

  useEffect(() => {
    if (isSuccess) {
      setSelectedFormattedCluster(installedFormattedClusters?.[0]);
    }
  }, [isSuccess, installedFormattedClusters?.[0]?.name]);

  const handleTabChange = (tabKey: string) => {
    const formattedCluster = find(installedFormattedClusters, { name: tabKey });
    if (formattedCluster) {
      setSelectedFormattedCluster(formattedCluster);
    }
  };

  return (
    <StyledModal
      visible={visible}
      title={t(isUninstall ? 'CLUSTER_AGENT_UNINSTALLATION_LOG' : 'CLUSTER_AGENT_INSTALLATION_LOG')}
      width={1360}
      footer={null}
      onCancel={onCancel}
    >
      <Wrapper>
        {!isUninstallRef.current && (
          <Overview>
            <Proportion size={40} />
            <ProgressWrapper>
              <ProgressTextWrapper>
                <ProgressText as="span">{t('CLUSTER_AGENT_INSTALLATION_PROGRESS')}</ProgressText>
                <ProgressText as="span">
                  {clusterInstalledCount}/{clusterCount} {t('INSTALLED')}
                </ProgressText>
              </ProgressTextWrapper>
              <Progress total={clusterCount} completed={clusterInstalledCount} />
            </ProgressWrapper>
          </Overview>
        )}
        <StyledTabs
          activeKey={selectedFormattedCluster?.name}
          variant="outline"
          direction="vertical"
          onTabChange={handleTabChange}
        >
          {formattedInstallPlan &&
            installedFormattedClusters.map(formattedCluster => {
              const { name } = formattedCluster;
              const isSelected = name === selectedFormattedCluster?.name;

              return (
                <Tab
                  key={name}
                  label={
                    <ClusterTabLabel
                      isSelected={isSelected}
                      formattedCluster={formattedCluster}
                      formattedInstallPlan={formattedInstallPlan}
                    />
                  }
                >
                  <ClusterLog
                    formattedCluster={formattedCluster}
                    formattedInstallPlan={formattedInstallPlan}
                  />
                </Tab>
              );
            })}
        </StyledTabs>
      </Wrapper>
    </StyledModal>
  );
}

export { ClusterLogsModal };
