/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import type { DeleteConfirmModalProps } from '@ks-console/shared';
import { DeleteConfirmModal } from '@ks-console/shared';

import type { FormattedExtension } from '../../../../../stores/extension';
import { useDeleteInstallPlanMutation } from '../../../../../stores/extension';
import { deleteInstallPlan } from '../../actions';

interface ExtensionUninstallConfirmModalProps
  extends Required<Pick<DeleteConfirmModalProps, 'visible'>> {
  formattedExtension: FormattedExtension;
  onClose: () => void;
  onDeleteInstallPlanSuccess: () => void;
}

function ExtensionUninstallConfirmModal({
  visible,
  formattedExtension,
  onDeleteInstallPlanSuccess,
  onClose,
}: ExtensionUninstallConfirmModalProps) {
  const deleteInstallPlanMutation = useDeleteInstallPlanMutation();

  if (!visible) {
    return null;
  }

  const { name } = formattedExtension;

  const handleOk = () =>
    deleteInstallPlan({
      formattedExtension,
      mutate: deleteInstallPlanMutation.mutate,
      onSuccess: () => {
        onDeleteInstallPlanSuccess();
        onClose();
      },
    });

  return (
    <DeleteConfirmModal
      visible
      resource={name}
      title={t('UNINSTALL_EXTENSION')}
      tip={t('UNINSTALL_CONFIRM_TIP', { extensionName: name })}
      confirmLoading={deleteInstallPlanMutation.isLoading}
      onOk={handleOk}
      onCancel={onClose}
    />
  );
}

export { ExtensionUninstallConfirmModal };
