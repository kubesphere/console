/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState, useRef } from 'react';
import { Pen } from '@kubed/icons';
import styled from 'styled-components';
import { useCacheStore as useStore } from '@ks-console/shared';
import { useForm, ActionConfirm, Modal } from '@kubed/components';

import { OriginalSecret, FormattedSecret } from '@ks-console/shared';

import SecretSettings from '../SecretSettings';

const StyledModal = styled(Modal)`
  .kubed-modal-body {
    padding: 20px;

    form {
      padding: 0;
    }

    & > div {
      position: unset;
      padding: 0;
      margin: 0;
    }
  }
`;

interface Props {
  detail: FormattedSecret;
  visible: boolean;
  onOk: (data: OriginalSecret) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  disableSelect?: boolean;
  isFederated?: boolean;
  cluster?: string;
}

export interface SecretSettingRef {
  hideDataForm: Function;
  dataFormRef: any;
}

function SecretEditModal({
  detail,
  visible,
  onOk,
  onCancel,
  isSubmitting,
  disableSelect,
  isFederated,
  cluster,
}: Props) {
  const [secretForm] = useForm();
  const [formTemplate, setFormTemplate] = useState<OriginalSecret>(detail._originData);
  const [secretChanged, setSecretChanged] = useStore<boolean>('secretChanged', false);
  const secretSettingRef = useRef<SecretSettingRef>(null);

  const handleCancel = () => {
    setSecretChanged(false);
    secretSettingRef?.current?.hideDataForm();
    secretForm.resetFields();
  };

  const getFormTemplate = () => {
    const originData = detail._originData;
    return { ...originData };
  };

  useEffect(() => {
    setFormTemplate(getFormTemplate());
  }, []);

  const handleOk = () => {
    secretForm.validateFields().then((data: any) => {
      if (data) {
        onOk(data);
        secretForm.submit();
      }
    });
  };

  const handleSubmit = () => {
    secretSettingRef?.current?.dataFormRef?.current?.handleSubmit();

    setSecretChanged(false);
  };

  const handleCancelModal = () => {
    setSecretChanged(false);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <StyledModal
      width={960}
      title={t('EDIT_SETTINGS')}
      titleIcon={<Pen size={20} />}
      onOk={handleOk}
      okText={t('OK')}
      onCancel={handleCancelModal}
      visible={visible}
      okButtonProps={{ disabled: !!secretChanged }}
      isSubmitting={isSubmitting}
    >
      <SecretSettings
        ref={secretSettingRef}
        form={secretForm}
        formTemplate={formTemplate}
        isFederated={isFederated}
        cluster={cluster}
        mode="edit"
        disableSelect={disableSelect}
        onOk={onOk}
      />
      <ActionConfirm visible={secretChanged} onOk={handleSubmit} onCancel={handleCancel} />
    </StyledModal>
  );
}

export default SecretEditModal;
