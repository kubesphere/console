/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import type { FormattedExtension, FormattedInstallPlan } from '../../../../../stores/extension';
import { useExtensionVersionsQuery } from '../../../../../stores/extension';
import type { LocalExtensionStatus } from '../../hooks/useLocalExtensionStatusItems';
import { formatLocalExtensionsStatus } from '../../utils/status';
import { filterUpdatableSatisfiedFormattedExtensionVersions } from '../../utils/version';

import { ActionButton } from './ActionButton';
import { LogButton } from './LogButton';
import { UpdateTip } from './UpdateTip';
import { ActionMenus } from './ActionMenus';

import { Wrapper } from './DetailActionButtons.styles';

interface DetailActionButtonsProps {
  formattedExtension: FormattedExtension;
  formattedInstallPlan: FormattedInstallPlan | undefined;
  localExtensionsStatus: LocalExtensionStatus;
  onCreateInstallPlanSuccess: () => void;
  onUpdateInstallPlanVersionSuccess: () => void;
  onUpdateInstallPlanEnabledSuccess: () => void;
  onDeleteInstallPlanSuccess: () => void;
  onForceDeleteInstallPlanSuccess: () => void;
}

function DetailActionButtons({
  formattedExtension,
  formattedInstallPlan,
  localExtensionsStatus,
  onCreateInstallPlanSuccess,
  onUpdateInstallPlanVersionSuccess,
  onUpdateInstallPlanEnabledSuccess,
  onDeleteInstallPlanSuccess,
  onForceDeleteInstallPlanSuccess,
}: DetailActionButtonsProps) {
  const { name: extensionName, isInstalled } = formattedExtension;
  const hasClusters =
    (formattedInstallPlan?.clusterScheduling?.placement?.clusters?.length ?? 0) > 0;
  const { isLocalAnyUninstalling } = formatLocalExtensionsStatus(localExtensionsStatus);

  const { formattedExtensionVersions } = useExtensionVersionsQuery({
    enabled: isInstalled,
    extensionName,
  });
  const updatableSatisfiedFormattedExtensionVersions =
    filterUpdatableSatisfiedFormattedExtensionVersions({
      formattedExtension,
      formattedExtensionVersions,
    });

  const renderLogButton = () => {
    if (hasClusters) {
      return (
        <LogButton
          formattedExtension={formattedExtension}
          formattedInstallPlan={formattedInstallPlan}
        />
      );
    }

    if (isLocalAnyUninstalling) {
      return null;
    }

    return (
      <LogButton
        formattedExtension={formattedExtension}
        formattedInstallPlan={formattedInstallPlan}
      />
    );
  };

  return (
    <Wrapper>
      <ActionButton
        formattedExtension={formattedExtension}
        formattedInstallPlan={formattedInstallPlan}
        localExtensionsStatus={localExtensionsStatus}
        onCreateInstallPlanSuccess={onCreateInstallPlanSuccess}
      />
      {renderLogButton()}
      {updatableSatisfiedFormattedExtensionVersions.length > 0 && <UpdateTip />}
      {!isLocalAnyUninstalling && (
        <ActionMenus
          formattedExtension={formattedExtension}
          formattedInstallPlan={formattedInstallPlan}
          localExtensionsStatus={localExtensionsStatus}
          updatableFormattedExtensionVersions={updatableSatisfiedFormattedExtensionVersions}
          onUpdateInstallPlanVersionSuccess={onUpdateInstallPlanVersionSuccess}
          onUpdateInstallPlanEnabledSuccess={onUpdateInstallPlanEnabledSuccess}
          onDeleteInstallPlanSuccess={onDeleteInstallPlanSuccess}
          onForceDeleteInstallPlanSuccess={onForceDeleteInstallPlanSuccess}
        />
      )}
    </Wrapper>
  );
}

export { DetailActionButtons };
