/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import { DownCircle, Trash } from '@kubed/icons';
import { Loading } from '@kubed/components';

import type { FormattedExtension } from '../../../../../stores/extension';
import { InstallModalActionType } from '../../constants';
import type { LocalExtensionStatus } from '../../hooks/useLocalExtensionStatusItems';
import { formatLocalExtensionsStatus } from '../../utils/status';
import { InstallModal } from '../InstallModal';
import { ExtensionLogButton } from '../ExtensionLogButton';
import { ExtensionUninstallConfirmModal } from '../ExtensionUninstallConfirmModal';
import { ExtensionForceUninstallConfirmModal } from '../ExtensionForceUninstallConfirmModal';
import {
  Wrapper,
  StyledInProgressButton,
  StyledUninstallingButton,
  StyledSettledButton,
  UninstallButtonsWrapper,
  StyledUninstallButton,
  StyledInstallButton,
  InstalledIcon,
  FailedIcon,
} from './DEPRECATED_ListActionButtons.styles';
import { useDisclosure } from '@kubed/hooks';
import { ExtensionLogModal } from '../ExtensionLogModal';

const loading = <Loading size={16} />;

const InProgressButton = ({ children }: PropsWithChildren<Record<never, never>>) => (
  <StyledInProgressButton leftIcon={loading} disabled>
    {children}
  </StyledInProgressButton>
);

const UninstallingButton = ({ children }: PropsWithChildren<Record<never, never>>) => (
  <StyledUninstallingButton leftIcon={loading} disabled>
    {children}
  </StyledUninstallingButton>
);

interface UninstallButtonsProps {
  statusText: string;
  onClick: () => void;
}

const UninstallButtons = ({ statusText, onClick }: UninstallButtonsProps) => (
  <UninstallButtonsWrapper>
    <StyledSettledButton leftIcon={<InstalledIcon />}>{statusText}</StyledSettledButton>
    <StyledUninstallButton leftIcon={<Trash variant="light" />} onClick={onClick}>
      {t('UNINSTALL')}
    </StyledUninstallButton>
  </UninstallButtonsWrapper>
);

const ForceUninstallButtons = ({ statusText, onClick }: UninstallButtonsProps) => (
  <UninstallButtonsWrapper>
    <StyledSettledButton leftIcon={<FailedIcon variant="light" />}>
      {statusText}
    </StyledSettledButton>
    <StyledUninstallButton leftIcon={<Trash variant="light" />} onClick={onClick}>
      {t('FORCE_UNINSTALL')}
    </StyledUninstallButton>
  </UninstallButtonsWrapper>
);

interface ListActionButtonsProps {
  formattedExtension: FormattedExtension;
  localExtensionsStatus: LocalExtensionStatus;
  onCreateInstallPlanSuccess: () => void;
  onDeleteInstallPlanSuccess: () => void;
  onForceDeleteInstallPlanSuccess: () => void;
}

function ListActionButtons({
  formattedExtension,
  localExtensionsStatus,
  onCreateInstallPlanSuccess,
  onDeleteInstallPlanSuccess,
  onForceDeleteInstallPlanSuccess,
}: ListActionButtonsProps) {
  const {
    isPreparing,
    isInstalling,
    isUpgrading,
    isInstalled,
    isUninstalling,
    isInstallFailed,
    isUpgradeFailed,
    isUninstallFailed,
  } = formattedExtension;
  const extensionLogModalTitle =
    isUninstalling || isUninstallFailed
      ? t('EXTENSION_UNINSTALLATION_LOG')
      : t('EXTENSION_INSTALLATION_LOG');

  const { isLocalInstalling, isLocalUpgrading, isLocalAnyUninstalling } =
    formatLocalExtensionsStatus(localExtensionsStatus);

  const extensionInstallModal = useDisclosure();
  const extensionLogModal = useDisclosure();
  const extensionUninstallConfirmModal = useDisclosure();
  const extensionForceUninstallConfirmModal = useDisclosure();

  const renderButtons = () => {
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
      return (
        <UninstallButtons
          statusText={t('INSTALLED')}
          onClick={extensionUninstallConfirmModal.open}
        />
      );
    }

    if (isInstallFailed) {
      return (
        <ForceUninstallButtons
          statusText={t('INSTALL_FAILED')}
          onClick={extensionForceUninstallConfirmModal.open}
        />
      );
    }

    if (isUpgradeFailed) {
      return (
        <ForceUninstallButtons
          statusText={t('UPDATE_FAILED')}
          onClick={extensionForceUninstallConfirmModal.open}
        />
      );
    }

    if (isUninstallFailed) {
      return (
        <ForceUninstallButtons
          statusText={t('UNINSTALL_FAILED')}
          onClick={extensionForceUninstallConfirmModal.open}
        />
      );
    }

    return (
      <StyledInstallButton leftIcon={<DownCircle />} onClick={extensionInstallModal.open}>
        {t('INSTALL')}
      </StyledInstallButton>
    );
  };

  return (
    <>
      <Wrapper>
        {renderButtons()}
        {!isLocalAnyUninstalling && (
          <ExtensionLogButton
            formattedExtension={formattedExtension}
            onClick={extensionLogModal.open}
          />
        )}
      </Wrapper>
      {extensionInstallModal.isOpen && (
        <InstallModal
          visible={extensionInstallModal.isOpen}
          actionType={InstallModalActionType.ExtensionInstall}
          formattedExtension={formattedExtension}
          localExtensionsStatus={localExtensionsStatus}
          onClose={extensionInstallModal.close}
          onCreateInstallPlanSuccess={onCreateInstallPlanSuccess}
        />
      )}
      {extensionLogModal.isOpen && (
        <ExtensionLogModal
          visible={extensionLogModal.isOpen}
          initialTitle={extensionLogModalTitle}
          formattedExtension={formattedExtension}
          onCancel={extensionLogModal.close}
        />
      )}
      {extensionUninstallConfirmModal.isOpen && (
        <ExtensionUninstallConfirmModal
          visible={extensionUninstallConfirmModal.isOpen}
          formattedExtension={formattedExtension}
          onDeleteInstallPlanSuccess={onDeleteInstallPlanSuccess}
          onClose={extensionUninstallConfirmModal.close}
        />
      )}
      {extensionForceUninstallConfirmModal.isOpen && (
        <ExtensionForceUninstallConfirmModal
          visible={extensionForceUninstallConfirmModal.isOpen}
          formattedExtension={formattedExtension}
          onForceDeleteInstallPlanSuccess={onForceDeleteInstallPlanSuccess}
          onClose={extensionForceUninstallConfirmModal.close}
        />
      )}
    </>
  );
}

export { ListActionButtons };
