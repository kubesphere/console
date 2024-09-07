/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useDisclosure } from '@kubed/hooks';

import { StatusIndicator } from '@ks-console/shared';
import type { FormattedExtension } from '../../../../../stores/extension';
import type { LocalExtensionStatus } from '../../hooks/useLocalExtensionStatusItems';
import { getExtensionStatusStateInfo, formatLocalExtensionsStatus } from '../../utils/status';
import { ExtensionLogButton } from '../ExtensionLogButton';
import { ExtensionLogModal } from '../ExtensionLogModal';
import { Wrapper } from './ExtensionStatus.styles';

interface ExtensionStatusProps {
  formattedExtension: FormattedExtension;
  localExtensionsStatus: LocalExtensionStatus;
}

function ExtensionStatus({ formattedExtension, localExtensionsStatus }: ExtensionStatusProps) {
  const { isUninstalling, isUninstallFailed } = formattedExtension;
  const { indicatorType, indicatorMotion, statusText } =
    getExtensionStatusStateInfo(formattedExtension, localExtensionsStatus) ?? {};
  const { isLocalAnyUninstalling } = formatLocalExtensionsStatus(localExtensionsStatus);
  const extensionLogModal = useDisclosure();

  const extensionLogModalTitle =
    isUninstalling || isUninstallFailed
      ? t('EXTENSION_UNINSTALLATION_LOG')
      : t('EXTENSION_INSTALLATION_LOG');

  return (
    <>
      <Wrapper>
        <StatusIndicator type={indicatorType} motion={indicatorMotion}>
          {statusText}
        </StatusIndicator>
        {!isLocalAnyUninstalling && (
          <ExtensionLogButton
            formattedExtension={formattedExtension}
            onClick={extensionLogModal.open}
          />
        )}
      </Wrapper>
      {extensionLogModal.isOpen && (
        <ExtensionLogModal
          visible={extensionLogModal.isOpen}
          initialTitle={extensionLogModalTitle}
          formattedExtension={formattedExtension}
          onCancel={extensionLogModal.close}
        />
      )}
    </>
  );
}

export { ExtensionStatus };
