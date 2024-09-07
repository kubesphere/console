/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { forwardRef, useEffect, useRef, useState, Ref, useImperativeHandle } from 'react';
import { trim } from 'lodash';

import { Form, Input, FormItem, useForm } from '@kubed/components';
import AutoSizeTextarea from 'react-textarea-autosize';

import { Icon, safeAtob, safeBtoa } from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';
import { DefaultWrapper, FormWrapper } from './styles';
import { DataFormRef } from '../SecretSettings';

interface Props {
  selectKey: string;
  [propName: string]: any;
}

interface FormValues {
  key: string;
  value: string;
}

function SecretDataForm(
  { detail, selectKey, onCancel, onOk, module }: Props,
  ref: Ref<DataFormRef>,
) {
  const [, setSecretChanged] = useStore<'true'>('secretChanged');

  const formRef = useRef(null);

  const [form] = useForm<FormValues>();

  const getFormData = () => {
    return {
      key: selectKey || '',
      value: module === 'configmaps' ? detail[selectKey] || '' : safeAtob(detail[selectKey] || ''),
    };
  };
  const [formData] = useState(getFormData());

  useEffect(() => {
    setSecretChanged('true');
  }, []);

  const handleGoBack = () => {
    onCancel();
  };

  const handleSubmit = (callback: Function) => {
    form.validateFields().then((data: any) => {
      const { key, value } = data;

      onOk({ [trim(key)]: module === 'configmaps' ? value : safeBtoa(value) });
      if (callback) {
        callback();
      }
    });
  };

  useImperativeHandle(ref, () => {
    return {
      handleSubmit,
    };
  });

  return (
    <DefaultWrapper>
      <h6>
        <a className="custom-icon" onClick={handleGoBack}>
          <Icon name={'return'} />
        </a>
        {!detail[selectKey] ? t('ADD_DATA_TCAP') : t('EDIT_DATA_TCAP')}
      </h6>
      <FormWrapper>
        <Form initialValues={formData} ref={formRef} form={form}>
          <FormItem label={t('DATA_KEY')} name={'key'}>
            <Input />
          </FormItem>
          <FormItem label={t('DATA_VALUE')} name={'value'}>
            <AutoSizeTextarea rows={4} style={{ width: '100%' }} />
          </FormItem>
        </Form>
      </FormWrapper>
    </DefaultWrapper>
  );
}

export default forwardRef(SecretDataForm);
