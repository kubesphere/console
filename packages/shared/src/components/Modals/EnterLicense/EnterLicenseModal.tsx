/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { merge } from 'lodash';
import type { ModalProps } from '@kubed/components';
import { useForm, Modal, notify } from '@kubed/components';

import { licenseStore } from '../../../stores';
import type { EnterLicenseFormValues } from './types';
import { EnterLicenseForm } from './EnterLicenseForm';

const { usePostLicenseMutation } = licenseStore;

interface EnterLicenseModalProps extends Pick<ModalProps, 'visible' | 'title'> {
  onCancel: () => void;
  isReloadOnSuccess?: boolean;
  onSuccess?: () => void;
}

export function EnterLicenseModal({
  isReloadOnSuccess,
  onSuccess,
  ...rest
}: EnterLicenseModalProps) {
  const defaultProps = {
    title: t('ENTER_ACTIVATION_CODE'),
  };
  const finalProps = merge({}, defaultProps, rest);
  const { visible, onCancel } = finalProps;

  const [form] = useForm<EnterLicenseFormValues>();
  const { isLoading, mutate } = usePostLicenseMutation({
    onSuccess: () => {
      onCancel();
      notify.success(t('ACTIVATION_SUCCESSFUL'));

      if (isReloadOnSuccess) {
        window.setTimeout(() => window.location.reload(), 1500);
      }

      onSuccess?.();
    },
  });

  if (!visible) {
    return null;
  }

  const handleOk = async () => {
    const values = await form.validateFields();
    mutate(values);
  };

  return (
    <Modal
      // for embed
      wrapClassName="enter-license-modal-wrap"
      confirmLoading={isLoading}
      onOk={handleOk}
      {...finalProps}
    >
      <EnterLicenseForm form={form} />
    </Modal>
  );
}
