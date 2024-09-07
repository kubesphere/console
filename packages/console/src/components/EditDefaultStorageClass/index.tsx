/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Modal } from '@kubed/components';
import * as React from 'react';
import { H5, ModalBody } from './styles';
import { Information } from '@kubed/icons';

interface EditDefaultStorageClassProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const EditDefaultStorageClass = (props: EditDefaultStorageClassProps) => {
  const { visible, onOk, onCancel, isSubmitting } = props;
  return (
    <Modal
      width={520}
      onOk={onOk}
      onCancel={onCancel}
      visible={visible}
      okText={t('OK')}
      cancelText={t('CANCEL')}
      isSubmitting={isSubmitting}
      header={null}
      closeIcon={null}
    >
      <ModalBody>
        <H5>
          <Information fill={'#41b1ea'} color="#fff" size={18} />
          &nbsp;&nbsp;
          {t('SET_DEFAULT_STORAGE_CLASS_TITLE')}
        </H5>
        <p>{t('STORAGE_CLASS_SET_DEFAULT_DESC')}</p>
      </ModalBody>
    </Modal>
  );
};

export default EditDefaultStorageClass;
