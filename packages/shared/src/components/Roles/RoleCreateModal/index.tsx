/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';

import { FormItemProps, Modal } from '@kubed/components';
import { Role } from '@kubed/icons';
import { Pattern } from '../../../constants';
import { roleStore } from '../../../stores';

import RoleBaseInformation, { FormRef } from '../RoleBaseInformation';
import type { RoleBaseInformationFormValues } from '../../../types';

export interface Props {
  module: string;
  title?: string;
  visible: boolean;
  confirmLoading?: boolean;
  onOk: (data: RoleBaseInformationFormValues) => void;
  onCancel: () => void;
  params?: Record<string, any>;
}

function RoleCreateModal({
  module,
  title,
  visible,
  confirmLoading,
  onCancel,
  onOk,
  params,
}: Props) {
  const { checkName } = roleStore(module);
  const formRef = useRef<FormRef>(null);
  const handleOk = () => {
    formRef?.current?.form.submit();
  };
  const rules: FormItemProps['rules'] = [
    {
      required: true,
      message: t('NAME_EMPTY_DESC'),
    },
    {
      pattern: Pattern.PATTERN_NAME,
      message: t('INVALID_NAME_DESC'),
    },
    {
      validator: async (rule, value) => {
        return checkName(
          { name: value, ...(module === 'workspaceroles' ? { workspace: params?.workspace } : {}) },
          {},
        );
      },
    },
  ];
  const formFieldProps = {
    'metadata.name': {
      rules,
    },
  };

  return (
    <Modal
      visible={visible}
      titleIcon={<Role size={20} />}
      title={title || t('CREATE_ROLE')}
      width={600}
      okText={t('EDIT_PERMISSIONS')}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <RoleBaseInformation
        ref={formRef}
        formFieldProps={formFieldProps}
        onOk={value => onOk?.(value)}
      />
    </Modal>
  );
}

export default RoleCreateModal;
