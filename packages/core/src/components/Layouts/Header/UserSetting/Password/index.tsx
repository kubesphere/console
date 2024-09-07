/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Form,
  FormItem,
  InputPassword,
  FormInstance,
  Alert,
  Dropdown,
  notify,
} from '@kubed/components';
import { useCacheStore as useStore } from '@ks-console/shared';
import { Pattern, PasswordTip } from '@ks-console/shared';
import { useModifyPassword } from '../../../../../stores/user';

interface WrapperProps {
  $visible: boolean;
}

const PasswordWrapper = styled('div')<WrapperProps>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
`;

interface PasswordProps {
  visible: boolean;
  form: FormInstance;
}

const Password = ({ visible, form }: PasswordProps) => {
  const [, setPasswordChanged] = useStore('PasswordChanged');
  const [password, setPassword] = useState<string>('');
  const [tipVisible, setTipVisible] = useState(false);

  const { mutate } = useModifyPassword(globals.user.username, () => {
    notify.success(t('UPDATE_SUCCESSFUL'));
    setTimeout(() => {
      location.href = '/login';
    }, 1000);
  });

  const passwordValidator = (rule: any, value: string) => {
    if (!value) return Promise.reject();
    if (value !== form.getFieldValue('password')) {
      return Promise.reject(t('PASSWORD_NOT_SAME_DESC'));
    }

    return Promise.resolve();
  };

  const onChange = () => {
    setPasswordChanged(true);
  };

  const onValuesChange = (data: any) => {
    if (data.password) {
      setPassword(data.password);
    }
  };

  const onFinish = (data: any) => {
    mutate(data);
  };

  return (
    <PasswordWrapper $visible={visible}>
      <div className="form-title">{t('PASSWORD_SETTINGS')}</div>
      <Form
        className="setting-form"
        autoComplete="off"
        form={form}
        onChange={onChange}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <FormItem
          label={t('CURRENT_PASSWORD')}
          help={t('ENTER_CURRENT_PASSWORD_DESC')}
          name="currentPassword"
          rules={[{ required: true, message: t('ENTER_CURRENT_PASSWORD_TIP') }]}
        >
          <InputPassword autoComplete="nope" />
        </FormItem>
        <Alert type="warning" showIcon={false} style={{ marginBottom: '12px' }}>
          {t('PASSWORD_DESC')}
        </Alert>
        <Dropdown
          content={<PasswordTip password={password} hasProgress />}
          maxWidth={350}
          placement="top"
          className="password-tip-dropdown"
          interactive={false}
          visible={tipVisible}
        >
          <div>
            <FormItem
              label={t('NEW_PASSWORD')}
              name="password"
              rules={[
                { required: true, message: t('PASSWORD_EMPTY_DESC') },
                {
                  pattern: Pattern.PATTERN_PASSWORD,
                  message: t('PASSWORD_DESC'),
                },
              ]}
            >
              <InputPassword
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
        <FormItem
          label={t('CONFIRM_PASSWORD')}
          name="rePassword"
          rules={[
            { required: true, message: t('CONFIRM_PASSWORD_TIP') },
            { validator: passwordValidator },
          ]}
        >
          <InputPassword />
        </FormItem>
      </Form>
    </PasswordWrapper>
  );
};

export default Password;
