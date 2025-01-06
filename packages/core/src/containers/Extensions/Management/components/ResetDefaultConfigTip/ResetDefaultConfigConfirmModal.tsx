/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ModalProps } from '@kubed/components';
import { Question } from '@kubed/icons';

import { StyledModal, Header, Title, Description } from './ResetDefaultConfigConfirmModal.styles';

type ResetDefaultConfigConfirmModalProps = Pick<
  ModalProps,
  'visible' | 'confirmLoading' | 'onCancel' | 'onOk'
>;

export function ResetDefaultConfigConfirmModal({
  visible,
  confirmLoading,
  onCancel,
  onOk,
}: ResetDefaultConfigConfirmModalProps) {
  return (
    <StyledModal
      visible={visible}
      header={null}
      closable={false}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Header>
        <Question size={20} />
        <Title>{t('RESET_DEFAULT_CONFIGURATION_TITLE')}</Title>
      </Header>
      <Description>{t('RESET_DEFAULT_CONFIGURATION_CONFIRM_DESCRIPTION')}</Description>
    </StyledModal>
  );
}
