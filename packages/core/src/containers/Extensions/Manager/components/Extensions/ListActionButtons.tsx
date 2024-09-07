/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Button, Tooltip } from '@kubed/components';
import { DownloadBox, Trash, Stop, Start } from '@kubed/icons';

import { useActionMenu } from '@ks-console/shared';
import type { FormattedExtension } from '../../../../../stores/extension';

interface ListActionButtonsProps {
  formattedExtension: FormattedExtension;
  onInstallButtonClick: () => void;
  onUninstallButtonClick: () => void;
  onForceUninstallButtonClick: () => void;
  onEnabledButtonClick: () => void;
  onDisabledButtonClick: () => void;
}

function ListActionButtons({
  formattedExtension,
  onInstallButtonClick,
  onUninstallButtonClick,
  onForceUninstallButtonClick,
  onEnabledButtonClick,
  onDisabledButtonClick,
}: ListActionButtonsProps) {
  const {
    isInstalled,
    isUninstalled,
    isInstallFailed,
    isUpgradeFailed,
    isUninstallFailed,
    isEnabled,
    isDisabled,
  } = formattedExtension;

  const actions = [
    {
      key: 'uninstall',
      icon: <Trash />,
      text: t('UNINSTALL'),
      show: isInstalled,
      onClick: onUninstallButtonClick,
    },
    {
      key: 'force-uninstall',
      icon: <Trash />,
      text: t('FORCE_UNINSTALL'),
      show: isInstallFailed || isUpgradeFailed || isUninstallFailed,
      onClick: onForceUninstallButtonClick,
    },
    {
      key: 'enable',
      icon: <Start />,
      text: t('ENABLE'),
      show: isInstalled && isDisabled,
      onClick: onEnabledButtonClick,
    },
    {
      key: 'disable',
      icon: <Stop />,
      text: t('DISABLE'),
      show: isInstalled && isEnabled,
      onClick: onDisabledButtonClick,
    },
  ];

  const renderItemActions = useActionMenu({ actions });

  if (isUninstalled) {
    return (
      <Tooltip content={t('INSTALL')}>
        <Button variant="text" radius="lg" onClick={onInstallButtonClick}>
          <DownloadBox size={16} />
        </Button>
      </Tooltip>
    );
  }

  return <>{renderItemActions(formattedExtension)}</>;
}

export { ListActionButtons };
