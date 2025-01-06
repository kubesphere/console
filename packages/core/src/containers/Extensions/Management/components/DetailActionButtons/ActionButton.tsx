/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import { Loading } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import { DownCircle } from '@kubed/icons';

import type { FormattedExtension, FormattedInstallPlan } from '../../../../../stores/extension';
import { InstallModalActionType } from '../../constants';
import { formatLocalExtensionsStatus } from '../../utils/status';
import type { LocalExtensionStatus } from '../../hooks/useLocalExtensionStatusItems';
import { InstallModal } from '../InstallModal';
import {
  StyledBaseButton,
  StyledSettledButton,
  InstalledIcon,
  FailedIcon,
} from './ActionButton.styles';

const ICON_SIZE = 16;
const loading = <Loading size={ICON_SIZE} />;

const InProgressButton = ({
  color = 'secondary',
  children,
}: PropsWithChildren<{ color?: string }>) => (
  <StyledBaseButton color={color} leftIcon={loading} disabled>
    {children}
  </StyledBaseButton>
);

const UninstallingButton = ({ children }: PropsWithChildren<Record<never, never>>) => (
  <InProgressButton color="red">{children}</InProgressButton>
);

const InstalledButton = () => (
  <StyledSettledButton>
    <InstalledIcon size={ICON_SIZE} />
    {t('INSTALLED')}
  </StyledSettledButton>
);

const FailedButton = ({ children }: PropsWithChildren<Record<never, never>>) => (
  <StyledSettledButton>
    <FailedIcon variant="light" size={ICON_SIZE} /> {children}
  </StyledSettledButton>
);

interface ActionButtonProps {
  formattedExtension: FormattedExtension;
  formattedInstallPlan: FormattedInstallPlan | undefined;
  localExtensionsStatus: LocalExtensionStatus;
  onCreateInstallPlanSuccess: () => void;
}

function ActionButton({
  formattedExtension,
  formattedInstallPlan,
  localExtensionsStatus,
  onCreateInstallPlanSuccess,
}: ActionButtonProps) {
  const {
    isPreparing,
    isInstalling,
    isUpgrading,
    isUninstalling,
    isInstalled,
    isInstallFailed,
    isUpgradeFailed,
    isUninstallFailed,
  } = formattedExtension;

  const { isLocalInstalling, isLocalUpgrading, isLocalAnyUninstalling } =
    formatLocalExtensionsStatus(localExtensionsStatus);

  const extensionInstallModal = useDisclosure();

  const renderButton = () => {
    if (isLocalInstalling || isLocalUpgrading) {
      return <InProgressButton>{t('LOCAL_PENDING')}...</InProgressButton>;
    }

    if (isLocalAnyUninstalling) {
      return <UninstallingButton>{t('LOCAL_PENDING')}...</UninstallingButton>;
    }

    if (isPreparing) {
      return <InProgressButton>{t('PREPARING')}...</InProgressButton>;
    }

    if (isInstalling) {
      return <InProgressButton>{t('INSTALLING')}...</InProgressButton>;
    }

    if (isUpgrading) {
      return <InProgressButton>{t('UPDATING')}...</InProgressButton>;
    }

    if (isUninstalling) {
      return <UninstallingButton>{t('UNINSTALLING')}...</UninstallingButton>;
    }

    if (isInstalled) {
      return <InstalledButton />;
    }

    if (isInstallFailed) {
      return <FailedButton>{t('INSTALL_FAILED')}</FailedButton>;
    }

    if (isUpgradeFailed) {
      return <FailedButton>{t('UPDATE_FAILED')}</FailedButton>;
    }

    if (isUninstallFailed) {
      return <FailedButton>{t('UNINSTALL_FAILED')}</FailedButton>;
    }

    return (
      <StyledBaseButton
        color="secondary"
        leftIcon={<DownCircle />}
        onClick={extensionInstallModal.open}
      >
        {t('INSTALL')}
      </StyledBaseButton>
    );
  };

  return (
    <>
      {renderButton()}
      {extensionInstallModal.isOpen && (
        <InstallModal
          visible={extensionInstallModal.isOpen}
          actionType={InstallModalActionType.ExtensionInstall}
          formattedExtension={formattedExtension}
          formattedInstallPlan={formattedInstallPlan}
          localExtensionsStatus={localExtensionsStatus}
          onClose={extensionInstallModal.close}
          onCreateInstallPlanSuccess={onCreateInstallPlanSuccess}
        />
      )}
    </>
  );
}

export { ActionButton };
