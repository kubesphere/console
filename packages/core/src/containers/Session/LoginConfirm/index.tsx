/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import { Button, Card, Form, FormItem, Input } from '@kubed/components';
import { request, Pattern, validator } from '@ks-console/shared';

import {
  LoginHeader,
  LoginWrapper,
  WelcomeTitle,
  LoginDivider,
  LoginButton,
} from '../Login/styles';

const nameValidator = async (rule: any, value: string) => {
  const params = {
    apiVersion: 'kapis/iam.kubesphere.io/v1beta1',
    name: value,
    module: 'users',
  };
  return validator.nameValidator(params);
};

const LoginConfirm = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation(
    data => {
      return request.post('login/confirm', data);
    },
    {
      onSuccess: (data: any) => {
        if (data.success) {
          navigate(data.redirect);
        }
      },
    },
  );

  const kseLogo = globals.config.logo || globals.defaultTheme.logo;
  const logo = globals.useDefaultTheme ? kseLogo : globals.theme.logo;

  return (
    <LoginWrapper>
      <LoginHeader href="/">
        <img src={logo} alt="logo" />
      </LoginHeader>
      <Card className="login-box" contentClassName="login-card">
        <WelcomeTitle>{t('PLEASE_CONFIRM_YOUR_ACCOUNT_INFO')}</WelcomeTitle>
        <LoginDivider />
        <Form className="login-form" size="md" onFinish={loginMutation.mutate}>
          <FormItem
            label={t('EMAIL')}
            name="email"
            className="username"
            help={t('USER_SETTING_EMAIL_DESC')}
            initialValue={get(globals, 'user.email')}
            rules={[
              {
                required: true,
                message: t('INPUT_USERNAME_OR_EMAIL_TIP'),
              },
              { type: 'email', message: t('INVALID_EMAIL') },
              { validator: validator.emailValidator },
            ]}
          >
            <Input name="email" placeholder="user@example.com" />
          </FormItem>
          <FormItem
            label={t('Username')}
            name="username"
            help={t('USERNAME_DESC')}
            defaultValue={get(globals, 'user.username')}
            rules={[
              { required: true, message: t('PLEASE_INPUT_USERNAME') },
              { pattern: Pattern.PATTERN_USER_NAME, message: t('USERNAME_INVALID') },
              { validator: nameValidator, message: t('USERNAME_EXISTS') },
            ]}
          >
            <Input name="username" placeholder="user@example.com" maxLength={32} />
          </FormItem>
          <LoginButton>
            <Button color="secondary" block shadow radius="xl" loading={loginMutation.isLoading}>
              {t('LOG_IN')}
            </Button>
          </LoginButton>
        </Form>
      </Card>
    </LoginWrapper>
  );
};

export default LoginConfirm;
