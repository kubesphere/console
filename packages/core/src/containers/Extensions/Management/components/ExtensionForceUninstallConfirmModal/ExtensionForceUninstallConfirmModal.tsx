/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import type { DeleteConfirmModalProps } from '@ks-console/shared';
import { DeleteConfirmModal } from '@ks-console/shared';

import type { FormattedExtension } from '../../../../../stores/extension';
import { useForceDeleteInstallPlanMutation } from '../../../../../stores/extension';
import { forceDeleteInstallPlan } from '../../actions';

interface ExtensionForceUninstallConfirmModalProps
  extends Required<Pick<DeleteConfirmModalProps, 'visible'>> {
  formattedExtension: FormattedExtension;
  onClose: () => void;
  onForceDeleteInstallPlanSuccess: () => void;
}

function ExtensionForceUninstallConfirmModal({
  visible,
  formattedExtension,
  onForceDeleteInstallPlanSuccess,
  onClose,
}: ExtensionForceUninstallConfirmModalProps) {
  const forceDeleteInstallPlanMutation = useForceDeleteInstallPlanMutation();

  if (!visible) {
    return null;
  }

  const { name } = formattedExtension;

  const handleOk = () =>
    forceDeleteInstallPlan({
      formattedExtension,
      mutate: forceDeleteInstallPlanMutation.mutate,
      onSuccess: () => {
        onForceDeleteInstallPlanSuccess();
        onClose();
      },
    });

  return (
    <DeleteConfirmModal
      visible
      resource={name}
      title={t('FORCE_UNINSTALL_EXTENSION')}
      tip={t('UNINSTALL_CONFIRM_TIP', { extensionName: name })}
      confirmLoading={forceDeleteInstallPlanMutation.isLoading}
      onOk={handleOk}
      onCancel={onClose}
    />
  );
}

export { ExtensionForceUninstallConfirmModal };
