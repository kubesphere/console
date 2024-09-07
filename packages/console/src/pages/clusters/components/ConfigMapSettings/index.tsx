/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState, useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { OriginalConfigMap, configMapStore } from '@ks-console/shared';

import { FormItem, FormInstance } from '@kubed/components';
import DataForm from '../DataForm';
import DataList from '../DataList';
import { useCacheStore as useStore } from '@ks-console/shared';
import { StyledForm } from './styles';
import { get, set } from 'lodash';
import { Constants } from '@ks-console/shared';

import { SecretSettingRef } from '../SecretEditModal';

const { MODULE_KIND_MAP } = Constants;
const { module } = configMapStore;

interface Props {
  formTemplate: OriginalConfigMap;
  isFederated?: boolean;
  cluster?: string;
  form: FormInstance;
  onOk: Function;
}

export interface FormItemRef {
  validateFun: Function;
}

export interface DataFormRef {
  handleSubmit: Function;
}

function ConfigMapSettings({ form, formTemplate, isFederated }: Props, ref: Ref<SecretSettingRef>) {
  const [secretChanged, setSecretChanged] = useStore<boolean>('secretChanged');
  const [formData] = useState<OriginalConfigMap>(
    get(formTemplate, MODULE_KIND_MAP[module], formTemplate),
  );
  const [fedFormTemplate, setFedFormTemplate] = useState({});

  const [state, setState] = useState<string>();
  const [selectDataKey, setSelectDataKey] = useState<string>();

  const dataFormRef = useRef<DataFormRef>(null);

  useEffect(() => {
    const newFedFormTemplate = isFederated ? get(formData, 'spec.template') : formData;
    setFedFormTemplate(newFedFormTemplate);
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [secretChanged]);

  const showDataForm = () => {
    setState('data');
    setSelectDataKey('');
  };

  const hideDataForm = () => {
    setState('');
    setSelectDataKey('');
    setSecretChanged(false);
  };

  useImperativeHandle(ref, () => {
    return {
      hideDataForm,
      dataFormRef,
    };
  });

  const handleData = (data: object) => {
    const originData = get(fedFormTemplate, 'data', {});
    if (selectDataKey) {
      delete originData[selectDataKey];
    }

    set(fedFormTemplate, 'data', { ...originData, ...data });

    hideDataForm();
  };

  const handleDataItemEdit = (key: string) => {
    setState('data');
    setSelectDataKey(key);
  };

  const renderDataForm = () => {
    const originData = get(fedFormTemplate, 'data', {});

    return (
      <DataForm
        ref={dataFormRef}
        detail={originData}
        // @ts-ignore
        selectKey={selectDataKey}
        onOk={handleData}
        onCancel={hideDataForm}
        module={module}
      />
    );
  };

  return state === 'data' ? (
    renderDataForm()
  ) : (
    <StyledForm form={form} initialValues={formData}>
      <FormItem label={t('DATA')} name="data">
        <DataList onEdit={handleDataItemEdit} onAdd={showDataForm} icon="hammer" module={module} />
      </FormItem>
    </StyledForm>
  );
}

export default forwardRef(ConfigMapSettings);
