/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Modal, ModalProps } from '@kubed/components';
import Icon from '../Icon';

import { RecreateWrapper, RecreateText } from './styles';

interface RecreateProps {
  visible: boolean;
  name: string;
  type: string;
  confirmLoading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  modalProps?: ModalProps;
}
const RecreateModal = ({
  visible = false,
  name,
  type,
  confirmLoading = false,
  onOk = () => {},
  onCancel = () => {},
  modalProps,
}: RecreateProps) => {
  return (
    <Modal
      visible={visible}
      width={520}
      header={null}
      closable={false}
      confirmLoading={confirmLoading}
      onOk={onOk}
      onCancel={onCancel}
      {...modalProps}
    >
      <RecreateWrapper>
        <Icon name="question" size={40} />
        <RecreateText>
          <div>{t('RECREATE')}</div>
          <p>
            {t('RECREATE_CONFIRM_DESC', {
              resource: name,
              type: t(type.toUpperCase()),
            })}
          </p>
        </RecreateText>
      </RecreateWrapper>
    </Modal>
  );
};

export default RecreateModal;
