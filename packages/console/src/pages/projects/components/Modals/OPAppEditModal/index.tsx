/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { ApplicationsInstanceDetail, Icon, safeBtoa } from '@ks-console/shared';
import { Field, FormItem, Input, Modal, useForm, Textarea } from '@kubed/components';

import { EditForm } from '../styles';

type Props = {
  visible: boolean;
  onOk: (patchData: any) => void;
  onCancel: () => void;
  appDetail?: ApplicationsInstanceDetail;
  isUpdating?: boolean;
};

function OPAppEditModal({ appDetail, visible, onOk, onCancel, isUpdating }: Props): JSX.Element {
  const [form] = useForm();
  const initData = {
    name: appDetail?.metadata.name,
    description: appDetail?.metadata.annotations?.['kubesphere.io/description'],
  };

  function handleOk(): void {
    const data = form.getFieldsValue();
    const params = {
      kind: 'ApplicationRelease',
      metadata: {
        name: appDetail?.metadata.name,
        annotations: {
          ...appDetail?.metadata.annotations,
          'kubesphere.io/description': data.description,
        },
      },
      spec: {
        ...appDetail?.spec,
        values: safeBtoa({
          kind: appDetail?.kind,
          apiVersion: appDetail?.apiVersion,
          metadata: {
            ...appDetail?.metadata,
            annotations: {
              ...appDetail?.metadata.annotations,
              'kubesphere.io/description': data.description,
            },
          },
          spec: appDetail?.spec,
          status: appDetail?.status,
        }),
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
        <FormItem name={['description']} label={t('DESCRIPTION')} help={t('DESCRIPTION_DESC')}>
          <Textarea maxLength={256} rows={3} />
        </FormItem>
      </EditForm>
    </Modal>
  );
}

export default OPAppEditModal;
