/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { merge } from 'lodash';
import styled from 'styled-components';

import {
  Modal,
  Form,
  FormItem,
  Input,
  InputPassword,
  Dropdown,
  Textarea,
  useForm,
  useWatch,
} from '@kubed/components';
import { Human } from '@kubed/icons';
import type { FormItemProps } from '@kubed/components';
import type { UserFormValues, UserActionValues } from '@ks-console/shared';
import { Pattern, PasswordTip } from '@ks-console/shared';
import RoleSelector from '../RoleSelector';

type Rules = FormItemProps['rules'];

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
export const Columns = styled.div`
  display: flex;
  gap: 12px;
`;

interface FormFieldProps {
  'metadata.name': {
    disabled?: boolean;
    rules: Rules;
  };
  'spec.email': {
    rules: Rules;
  };
  'spec.password'?: {
    isExclude?: boolean;
  };
}

export interface UserBaseModalProps {
  visible: boolean;
  title: string;
  formFieldProps: FormFieldProps;
  confirmLoading: boolean;
  formattedUser?: Record<string, any>;
  onOk: (formValues: UserActionValues) => void;
  onCancel: () => void;
}

export default function UserBaseModal({
  visible,
  title,
  formFieldProps,
  confirmLoading,
  formattedUser,
  onOk,
  onCancel,
}: UserBaseModalProps) {
  const initialValues = formattedUser?._originData ?? {};
  const [form] = useForm<UserFormValues>();
  const password = useWatch(['spec', 'password'], form) ?? '';
  const [tipVisible, setTipVisible] = useState(false);

  return (
    <Modal
      visible={visible}
      titleIcon={<Human size={20} />}
      title={title}
      width={691}
      confirmLoading={confirmLoading}
      onOk={form.submit}
      onCancel={onCancel}
    >
      <StyledForm
        form={form}
        initialValues={initialValues}
        onFinish={(formValues: UserFormValues) => {
          const params = merge(
            {
              apiVersion: 'iam.kubesphere.io/v1beta1',
              kind: 'User',
            } as const,
            formValues,
          );
          onOk(params);
        }}
      >
        <FormItem
          name={['metadata', 'name']}
          label={t('USERNAME')}
          help={t('USERNAME_DESC')}
          rules={formFieldProps['metadata.name'].rules}
        >
          <Input
            autoComplete="off"
            autoFocus={true}
            maxLength={32}
            disabled={formFieldProps['metadata.name'].disabled}
          />
        </FormItem>
        <Columns>
          <FormItem
            name={['metadata', 'annotations', 'kubesphere.io/alias-name']}
            label={t('ALIAS')}
            help={t('ALIAS_DESC')}
          >
            <Input autoComplete="off" maxLength={63} />
          </FormItem>
          <FormItem
            name={['spec', 'email']}
            label={t('EMAIL')}
            help={t('EMAIL_DESC')}
            rules={formFieldProps['spec.email'].rules}
          >
            <Input placeholder="user@example.com" autoComplete="off" />
          </FormItem>
        </Columns>
        <RoleSelector />
        {!formFieldProps?.['spec.password']?.isExclude && (
          <Dropdown
            visible={tipVisible}
            maxWidth={350}
            className="password-tip-dropdown"
            interactive={false}
            content={<PasswordTip password={password} hasProgress />}
          >
            <div>
              <FormItem
                name={['spec', 'password']}
                label={t('PASSWORD')}
                help={t('PASSWORD_DESC')}
                rules={[
                  {
                    required: true,
                    message: t('PASSWORD_EMPTY_DESC'),
                  },
                  {
                    pattern: Pattern.PATTERN_PASSWORD,
                    message: t('PASSWORD_INVALID_DESC'),
                  },
                ]}
              >
                <InputPassword
                  autoComplete="off"
                  onFocus={() => {
                    setTipVisible(true);
                  }}
                  onBlur={() => {
                    setTipVisible(false);
                  }}
                />
              </FormItem>
            </div>
          </Dropdown>
        )}
        <FormItem
          name={['metadata', 'annotations', 'kubesphere.io/description']}
          label={t('DESCRIPTION')}
          help={t('DESCRIPTION_DESC')}
        >
          <Textarea maxLength={256} rows={3} />
        </FormItem>
      </StyledForm>
    </Modal>
  );
}
