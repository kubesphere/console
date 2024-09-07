/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Form, FormItem, useForm, Input, Textarea } from '@kubed/components';
import { Pen } from '@kubed/icons';
import { ModalStyle } from './styles';
import { OriginData } from '../../../utils';

interface Props {
  initialValues: OriginData;
  visible?: boolean;
  onOk?: (value: OriginData) => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  hideFooter?: boolean;
  cancelText?: string;
  okText?: string;
}

function EditBaseInfoModal({ visible, onOk, onCancel, confirmLoading, initialValues }: Props) {
  const [form] = useForm();

  const handleOk = () => form.submit();

  const onFinish = () => {
    form.validateFields().then(() => {
      const data = form.getFieldsValue(true);
      onOk?.(data);
    });
  };

  return (
    <ModalStyle
      title={t('EDIT_INFORMATION')}
      titleIcon={<Pen />}
      width={691}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <Form form={form} initialValues={initialValues} onFinish={onFinish}>
        <FormItem label={t('NAME')} name={['metadata', 'name']}>
          <Input disabled />
        </FormItem>
        <FormItem
          label={t('ALIAS')}
          help={t('ALIAS_DESC')}
          name={['metadata', 'annotations', 'kubesphere.io/alias-name']}
        >
          <Input maxLength={63} />
        </FormItem>
        <FormItem
          label={t('DESCRIPTION')}
          help={t('DESCRIPTION_DESC')}
          name={['metadata', 'annotations', 'kubesphere.io/description']}
        >
          <Textarea maxLength={256} />
        </FormItem>
      </Form>
    </ModalStyle>
  );
}

export default EditBaseInfoModal;
