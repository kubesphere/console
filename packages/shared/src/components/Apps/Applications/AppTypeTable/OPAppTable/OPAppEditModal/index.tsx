/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import { Field, FormItem, Input, Modal, useForm, Textarea } from '@kubed/components';
import Icon from '../../../../../Icon';
import { getAnnotationsName } from '../../../../../../utils';
import type { ApplicationsInstanceDetail } from '../../../../../../types';

import { EditForm } from '../styles';

type Props = {
  visible: boolean;
  onOk: (patchData: any) => void;
  onCancel: () => void;
  appDetail?: ApplicationsInstanceDetail;
  isUpdating?: boolean;
};

export function OPAppEditModal({
  appDetail,
  visible,
  onOk,
  onCancel,
  isUpdating,
}: Props): JSX.Element {
  const [form] = useForm();
  const initData = {
    name: appDetail?.metadata.name,
    aliasName: getAnnotationsName(appDetail, 'kubesphere.io/alias-name'),
    description: getAnnotationsName(appDetail, 'kubesphere.io/description'),
  };

  useEffect(() => {
    const data = {
      name: appDetail?.metadata.name,
      aliasName: getAnnotationsName(appDetail, 'kubesphere.io/alias-name'),
      description: getAnnotationsName(appDetail, 'kubesphere.io/description'),
    };

    form.setFieldsValue(data);
  }, [appDetail]);
  function handleOk(): void {
    const data = form.getFieldsValue();
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { metadata, _originData = appDetail } = appDetail || {};
    const params = {
      ..._originData,
      metadata: {
        ...metadata,
        annotations: {
          ...metadata?.annotations,
          'kubesphere.io/alias-name': data.aliasName,
          'kubesphere.io/description': data.description,
        },
      },
    };
    onOk(params);
  }

  return (
    <Modal
      width={691}
      visible={visible}
      title={<Field value={t('EDIT_INFORMATION')} avatar={<Icon name="pen" size={20} />} />}
      onOk={handleOk}
      okText={t('OK')}
      onCancel={onCancel}
      isSubmitting={isUpdating}
    >
      <EditForm form={form} initialValues={initData}>
        <FormItem name={['name']} label={t('NAME')} help={t('LONG_NAME_DESC')}>
          <Input disabled />
        </FormItem>
        <FormItem label={t('ALIAS')} help={t('ALIAS_DESC')} name={['aliasName']}>
          <Input autoComplete="off" maxLength={63} />
        </FormItem>
        <FormItem name={['description']} label={t('DESCRIPTION')} help={t('DESCRIPTION_DESC')}>
          <Textarea maxLength={256} rows={3} />
        </FormItem>
      </EditForm>
    </Modal>
  );
}

export default OPAppEditModal;
