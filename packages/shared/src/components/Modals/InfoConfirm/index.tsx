/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import cx from 'classnames';

import Icon from '../../Icon';

import { StyledModal, StyledField } from './styles';

type Props = {
  visible: boolean;
  icon?: string;
  title?: string;
  description?: string;
  content: string;
  confirmLoading?: boolean;
  onOk?: () => void;
  onCancel: () => void;
};

export function InfoConfirmModal({
  visible,
  title,
  description,
  icon,
  content,
  onOk,
  onCancel,
  confirmLoading,
}: Props): JSX.Element {
  return (
    <StyledModal
      width={504}
      header={null}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
    >
      <StyledField
        className={cx({ name: !description })}
        avatar={
          <Icon
            name={icon || 'question'}
            size={description ? 40 : 32}
            style={{ color: '#ffffff', fill: '#329dce' }}
          />
        }
        value={title || t('APP_NOTE')}
        label={description}
      />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </StyledModal>
  );
}
