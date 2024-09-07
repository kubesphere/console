/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form, FormInstance, FormItem, Modal, Select, Text, useForm } from '@kubed/components';
import { Role } from '@kubed/icons';
import { FormattedRole, EditMemberRoleValue, InviteMemberPayload } from '../../../types';

export interface FormRef {
  form: FormInstance<EditMemberRoleValue>;
}

export interface Props {
  visible: boolean;
  roles: FormattedRole[];
  confirmLoading?: boolean;
  initialValue?: EditMemberRoleValue;
  onOk: (data: EditMemberRoleValue) => void;
  onCancel: () => void;
}

const OptionName = styled(Text)`
  font-size: 12px;
  line-height: 1.67;
  font-weight: bold;
  color: #fff;
`;

const OptionDescription = styled(Text)`
  font-size: 12px;
  line-height: 1.67;
  color: ${props => props.theme.palette.accents_5};
`;

const StyledForm = styled(Form)`
  padding: 20px;
  .form-item {
    .input-wrapper,
    .kubed-select {
      width: 100%;
      max-width: 455px;
    }
  }
`;

function MemberModifyModal({
  initialValue,
  visible,
  confirmLoading,
  onCancel,
  roles,
  onOk,
}: Props) {
  const [form] = useForm<InviteMemberPayload>();
  const handleOk = () => form.submit();

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue(initialValue);
    }
  }, [initialValue, form]);

  return (
    <Modal
      width={691}
      visible={visible}
      titleIcon={<Role size={20} />}
      title={t('CHANGE_ROLE')}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <StyledForm
        form={form}
        initialValues={initialValue}
        onFinish={(data: EditMemberRoleValue) => onOk?.(data)}
      >
        <FormItem
          name="roleRef"
          label={t('ROLE')}
          rules={[{ required: true, message: t('SELECT_ROLE_TIP') }]}
        >
          <Select
            optionLabelProp="title"
            options={roles.map(t => ({
              label: (
                <>
                  <OptionName>{t.aliasName ? `${t.aliasName} （${t.name}）` : t.name}</OptionName>
                  <OptionDescription>{t.description || ''}</OptionDescription>
                </>
              ),
              title: t.aliasName ? `${t.aliasName} （${t.name}）` : t.name,
              value: t.name,
            }))}
          ></Select>
        </FormItem>
      </StyledForm>
    </Modal>
  );
}

export default MemberModifyModal;
