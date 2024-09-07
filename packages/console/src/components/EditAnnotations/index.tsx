/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { OriginData } from '@ks-console/shared';
import { Form, FormItem, Input as Input1, useForm } from '@kubed/components';
import { Pen } from '@kubed/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { KVRecordInput } from '../RecordInput';
import RecordItem from '../RecordInput/RecordItem';
import { validate } from '../RecordInput/utils';
import { inputWithError, ModalStyle } from './styles';

const Input = styled(Input1)`
  ${inputWithError}
`;

export interface Props {
  initialValues: OriginData;
  visible?: boolean;
  onOk?: (value: OriginData) => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  hideFooter?: boolean;
  cancelText?: string;
  okText?: string;
}

function EditAnnotationsModal({ visible, onOk, onCancel, confirmLoading, initialValues }: Props) {
  const [form] = useForm();
  const [error, setError] = useState('');
  const handleOk = () => form.submit();

  const onFinish = () => {
    if (!error) {
      form.validateFields().then(() => {
        const data = form.getFieldsValue(true);
        onOk?.(data);
      });
    }
  };

  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    return e.target.value;
  };

  return (
    <ModalStyle
      title={t('EDIT_ANNOTATIONS')}
      titleIcon={<Pen />}
      width={960}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <Form form={form} initialValues={initialValues} onFinish={onFinish}>
        <FormItem
          label={null}
          name={['metadata', 'annotations']}
          // validateStatus={error ? 'error' : undefined}
          // help={error ? <FormItemError>{error}</FormItemError> : undefined}
        >
          <KVRecordInput
            validator={validate as any}
            onError={e => {
              setError(e.message);
            }}
          >
            <RecordItem>
              <Input name={'key'} placeholder={t('KEY')} $setValue={setValue} />
              <Input
                name={'value'}
                placeholder={t('VALUE')}
                $setValue={setValue}
                defaultValue={''}
              />
            </RecordItem>
          </KVRecordInput>
        </FormItem>
      </Form>
    </ModalStyle>
  );
}

export default EditAnnotationsModal;
