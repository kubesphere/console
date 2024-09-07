/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState, useRef } from 'react';
import { OriginalConfigMap, FormattedConfigMap } from '@ks-console/shared';

import { useCacheStore as useStore } from '@ks-console/shared';
import { useForm, ActionConfirm } from '@kubed/components';

import { StyledModal, PlacementConfirm } from './styles';

import ConfigMapSettings from '../ConfigMapSettings';

interface Props {
  detail: FormattedConfigMap;
  visible: boolean;
  onOk: (data: OriginalConfigMap) => void;
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

function ConfigMapEditModal({
  detail,
  visible,
  onOk,
  onCancel,
  isSubmitting,
  isFederated,
  cluster,
}: Props) {
  const [secretForm] = useForm();
  const [formTemplate, setFormTemplate] = useState<OriginalConfigMap>(detail._originData);
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
      icon="pen"
      onOk={handleOk}
      okText={t('OK')}
      onCancel={handleCancelModal}
      visible={visible}
      okButtonProps={{ disabled: !!secretChanged }}
      isSubmitting={isSubmitting}
    >
      <ConfigMapSettings
        ref={secretSettingRef}
        form={secretForm}
        formTemplate={formTemplate}
        isFederated={isFederated}
        cluster={cluster}
        onOk={onOk}
      />
      <PlacementConfirm>
        <ActionConfirm visible={secretChanged} onOk={handleSubmit} onCancel={handleCancel} />
      </PlacementConfirm>
    </StyledModal>
  );
}

export default ConfigMapEditModal;
