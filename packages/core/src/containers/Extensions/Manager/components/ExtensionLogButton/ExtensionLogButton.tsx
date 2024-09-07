/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Tooltip } from '@kubed/components';

import type { FormattedExtension } from '../../../../../stores/extension';

import { StyledButton, Icon } from './ExtensionLogButton.styles';

interface ExtensionLogButtonProps {
  formattedExtension: FormattedExtension;
  onClick: () => void;
}

function ExtensionLogButton({ formattedExtension, onClick }: ExtensionLogButtonProps) {
  const {
    isInstalling,
    isUpgrading,
    isUninstalling,
    isInstallFailed,
    isUpgradeFailed,
    isUninstallFailed,
  } = formattedExtension;
  const contentKey =
    isUninstalling || isUninstallFailed
      ? 'VIEW_EXTENSION_UNINSTALLATION_LOG'
      : 'VIEW_EXTENSION_INSTALLATION_LOG';

  if (
    !(
      isInstalling ||
      isUpgrading ||
      isUninstalling ||
      isInstallFailed ||
      isUpgradeFailed ||
      isUninstallFailed
    )
  ) {
    return null;
  }

  return (
    <Tooltip content={t(contentKey)}>
      <StyledButton onClick={onClick}>
        <Icon />
      </StyledButton>
    </Tooltip>
  );
}

export { ExtensionLogButton };
