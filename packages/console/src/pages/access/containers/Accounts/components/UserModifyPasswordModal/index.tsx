/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import {
  Modal,
  FormItem,
  Input,
  InputPassword,
  Dropdown,
  useForm,
  useWatch,
} from '@kubed/components';
import { Pen } from '@kubed/icons';

import type { FormattedUser, PutUserPasswordRequestData } from '@ks-console/shared';
import { Pattern, PasswordTip } from '@ks-console/shared';
import { StyledForm } from './styles';

interface UserModifyPasswordFormValues {
  email: string;
  password: string;
  rePassword: string;
}

export interface UserModifyPasswordModalProps {
  visible: boolean;
  formattedUser: FormattedUser;
  confirmLoading: boolean;
  onOk: (params: PutUserPasswordRequestData) => void;
  onCancel: () => void;
}

export default function UserModifyPasswordModal({
  visible,
  formattedUser,
  confirmLoading,
  onOk,
  onCancel,
}: UserModifyPasswordModalProps) {
  const [form] = useForm<UserModifyPasswordFormValues>();
  const password = useWatch('password', form) ?? '';
  const [tipVisible, setTipVisible] = useState(false);

  return (
    <Modal
      visible={visible}
      titleIcon={<Pen size={20} />}
      title={t('CHANGE_PASSWORD')}
      width={691}
      confirmLoading={confirmLoading}
      onOk={form.submit}
      onCancel={onCancel}
    >
      <StyledForm
        form={form}
        onFinish={(formValues: UserModifyPasswordFormValues) => {
          const { email, ...params } = formValues;
          onOk(params);
        }}
      >
        <FormItem name="email" label={t('EMAIL')}>
          <Input defaultValue={formattedUser.email} disabled />
        </FormItem>
        <Dropdown
          visible={tipVisible}
          maxWidth={350}
          className="password-tip-dropdown"
          interactive={false}
          content={<PasswordTip password={password} hasProgress />}
        >
          <div>
            <FormItem
              name="password"
              label={t('NEW_PASSWORD')}
              rules={[
                {
                  required: true,
                  message: t('PASSWORD_EMPTY_DESC'),
                },
                {
                  pattern: Pattern.PATTERN_PASSWORD,
                  message: t('PASSWORD_DESC'),
                },
              ]}
            >
              <InputPassword
                autoComplete="new-password"
                onFocus={() => {
                  setTipVisible(true);
                }}
                onBlur={() => {
                  setTipVisible(false);
                }}
              />
            </FormItem>
            <FormItem
              name="rePassword"
              label={t('CONFIRM_PASSWORD')}
              rules={[
                {
                  required: true,
                  message: t('CONFIRM_PASSWORD_TIP'),
                },
                {
                  validator: (rule, value) => {
                    if (!value) {
                      return Promise.reject();
                    }

                    if (value !== password) {
                      return Promise.reject(t('PASSWORD_NOT_SAME_DESC'));
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputPassword autoComplete="new-password" />
            </FormItem>
          </div>
        </Dropdown>
      </StyledForm>
    </Modal>
  );
}
