/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Information } from '@kubed/icons';
import { Content, StyledModal, Title } from './styles';

interface Props {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
}

function GatewayUpdateModal({ visible, confirmLoading, onOk, onCancel }: Props) {
  return (
    <StyledModal
      visible={visible}
      width={600}
      confirmLoading={confirmLoading}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div>
        <Title>
          <Information size={20} fill="#329dce" />
          <strong>{t('UPDATED_GATEWAY_TITLE')}</strong>
        </Title>
        <Content>{t('UPDATE_GATEWAY_DESC')}</Content>
      </div>
    </StyledModal>
  );
}

export default GatewayUpdateModal;
