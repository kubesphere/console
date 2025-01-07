/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import type { ConfirmModalProps } from '@ks-console/shared';
import { ConfirmModal } from '@ks-console/shared';

type ResetDefaultConfigConfirmModalProps = Pick<
  ConfirmModalProps,
  'visible' | 'confirmLoading' | 'onCancel' | 'onOk'
>;

export function ResetDefaultConfigConfirmModal({
  visible,
  confirmLoading,
  onCancel,
  onOk,
}: ResetDefaultConfigConfirmModalProps) {
  return (
    <ConfirmModal
      visible={visible}
      titleIconProps={{ type: 'info' }}
      title={t('RESET_DEFAULT_CONFIGURATION_TITLE')}
      description={t('RESET_DEFAULT_CONFIGURATION_CONFIRM_DESCRIPTION')}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={onOk}
    />
  );
}
