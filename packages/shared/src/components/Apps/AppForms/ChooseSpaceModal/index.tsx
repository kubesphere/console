/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { SafeNotice } from '@kubed/icons';
import { Form, FormItem, Modal, useForm } from '@kubed/components';
import { PlacementForm } from '../AppBaseInfoForm/PlacementForm';
import type { AppPlacementConfigFormRef } from '../AppBaseInfoForm/PlacementForm';
export type RejectFormData = {
  message?: string;
};

interface Props {
  visible: boolean;
  onOk?: (data: RejectFormData) => void;
  onCancel?: () => void;
  isEdge?: boolean;
  defaultVal: { namespace?: string; workspace?: string; cluster?: string };
}

function ChooseSpace({ visible, onOk, isEdge, onCancel, defaultVal }: Props): JSX.Element {
  const [form] = useForm();
  const placementFormRef = useRef<AppPlacementConfigFormRef>(null);

  const handleReject = async () => {
    const placementData = (await placementFormRef.current?.validateFields()) || {};
    form.setFieldValue('data', placementData);
    form.validateFields().then(onOk);
  };

  return (
    <Modal
      width={800}
      visible={visible}
      titleIcon={<SafeNotice size={20} />}
      title={t('LOCATION')}
      onOk={handleReject}
      onCancel={onCancel}
    >
      <Form form={form} className="rejectForm" style={{ padding: '20px' }}>
        <FormItem name={['data']} rules={[{ required: true, message: t('REJECT_REASON_TIP') }]}>
          <PlacementForm
            isEdge={isEdge}
            confirmedPlacementData={defaultVal}
            formRef={placementFormRef}
          />
        </FormItem>
      </Form>
    </Modal>
  );
}

export default ChooseSpace;
