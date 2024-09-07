/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Role } from '@kubed/icons';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Form, FormItem, Modal, Select, Text, useForm } from '@kubed/components';

import { roleStore } from '@ks-console/shared';
import type {
  FormattedRole,
  OriginalServiceAccount,
  FormattedServiceAccount,
} from '@ks-console/shared';

interface EditMemberRoleFormValues {
  roleRef: string;
}

interface Props {
  visible: boolean;
  detail: FormattedServiceAccount;
  confirmLoading?: boolean;
  initialValue?: OriginalServiceAccount;
  onOk: (data: EditMemberRoleFormValues) => void;
  onCancel: () => void;
}

const OptionName = styled(Text)`
  font-size: 12px;
  line-height: 1.67;
  font-weight: bold;
  color: #ffffff;
`;

const OptionDescription = styled(Text)`
  font-size: 12px;
  line-height: 1.67;
  color: ${({ theme }) => theme.palette.accents_5};
`;

function ModifyServiceAccountRole({
  initialValue,
  visible,
  confirmLoading,
  onCancel,
  detail,
  onOk,
}: Props) {
  const [form] = useForm<EditMemberRoleFormValues>();
  const handleOk = () => form.submit();
  const { fetchList } = roleStore('roles');

  const { data: roles = [] } = useQuery<FormattedRole[]>(['roles'], async () => {
    const res = await fetchList({
      cluster: detail?.cluster,
      namespace: detail?.namespace,
      limit: -1,
      annotation: 'kubesphere.io/creator',
    } as any);

    return res.data;
  });

  return (
    <Modal
      width={691}
      visible={visible}
      titleIcon={<Role size={20} />}
      title={t('CHANGE_ROLE')}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleOk}
      bodyStyle={{ padding: '20px' }}
    >
      <Form
        form={form}
        initialValues={initialValue}
        onFinish={(data: EditMemberRoleFormValues) => onOk?.(data)}
      >
        <FormItem
          name={['metadata', 'annotations', 'iam.kubesphere.io/role']}
          label={t('PROJECT_ROLE_SI')}
          rules={[{ required: true, message: t('SELECT_ROLE_TIP') }]}
          help={t('SERVICE_ACCOUNT_PROJECT_ROLE_DESC')}
        >
          <Select optionLabelProp="value">
            {roles.map(({ name, description }, index) => (
              <Select.Option key={`${index}_${name}`} value={name}>
                <OptionName>{name}</OptionName>
                <OptionDescription>{description || ''}</OptionDescription>
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
}

export default ModifyServiceAccountRole;
