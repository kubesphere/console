/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Button, Card, Alert, Form, FormItem, Input, InputPassword } from '@kubed/components';
import { cookie, request } from '@ks-console/shared';
import {
  LoginHeader,
  LoginWrapper,
  WelcomeTitle,
  LoginDivider,
  OauthButton,
  LoginButton,
  BackButton,
} from './styles';

type Server = {
  url: string;
  title: string;
  type: string;
  endSessionURL?: string;
};

function mix(salt: string, str: string) {
  if (str.length > salt.length) {
    salt += str.slice(0, str.length - salt.length);
  }

  const ret = [];
  const prefix = [];
  for (let i = 0, len = salt.length; i < len; i++) {
    const tomix = str.length > i ? str.charCodeAt(i) : 64;
    const sum = salt.charCodeAt(i) + tomix;
    prefix.push(sum % 2 === 0 ? '0' : '1');
    ret.push(String.fromCharCode(Math.floor(sum / 2)));
  }

  return `${window.btoa(prefix.join(''))}@${ret.join('')}`;
}

function encrypt(salt: string, str: string) {
  return mix(salt, window.btoa(str));
}

const Login = () => {
  const oauthServers = get(globals, 'oauthServers', []);

  const [errorMessage, setErrorMessage] = useState('');
  const [waitRedirect, setWaitRedirect] = useState(false);

  const [isLdapLogin, setIsLdapLogin] = useState(false);
  const isRegularLogin = !isLdapLogin;

  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') ?? '';
  const title = searchParams.get('title');
  const lowerCaseType = type.toLowerCase();
  const selectedServerByQuery = oauthServers.find((server: Server) => server.title === title);

  useEffect(() => {
    if (lowerCaseType.indexOf('ldap') > -1 && selectedServerByQuery) {
      setIsLdapLogin(true);
      setSelectedServer(selectedServerByQuery);
    } else {
      setIsLdapLogin(false);
      setSelectedServer(null);
    }
  }, [lowerCaseType, title]);

  const handleOAuthLogin = (server: Server) => {
    const info = {
      name: server.title,
      type: server.type,
      endSessionURL: server.endSessionURL,
    };
    cookie('oAuthLoginInfo', JSON.stringify(info));
    if (server?.type === 'LDAPIdentityProvider') {
      setIsLdapLogin(true);
      setSelectedServer(server);
    } else {
      window.location.href = server.url;
    }
  };

  const handleLoginPost = (formData: { username: string; password: string }) => {
    cookie('oAuthLoginInfo', '');
    const url = isLdapLogin ? `oauth/login/${selectedServer?.title}` : 'login';
    const { username, password } = formData;
    const data = {
      username,
      encrypt: encrypt('kubesphere', password),
    };

    return request.post(url, data);
  };

  const loginMutation = useMutation(handleLoginPost, {
    onSuccess: (data: any) => {
      if (data.status !== 200) {
        setErrorMessage(data.message);
      }
      if (data.success) {
        setWaitRedirect(true);
        // history.push(data.redirect);
        window.location.href = data.redirect;
      }
    },
  });
  useEffect(() => {
    loginMutation.mutate({ username: 'an', password: 'P@88w0rd' });
  }, []);

  const handleBack = () => {
    setErrorMessage('');
    setIsLdapLogin(false);
    setSelectedServer(null);
    navigate('/login');
  };

  const kseLogo = globals.config.logo || globals.defaultTheme.logo;
  const logo = globals.useDefaultTheme ? kseLogo : globals.theme.logo;

  return (
    <LoginWrapper>
      <LoginHeader href="/">
        <img src={logo} />
      </LoginHeader>
      <Card className="login-box" contentClassName="login-card">
        <WelcomeTitle>
          {isRegularLogin
            ? t('WELCOME')
            : t('USERNAME_WITH_TITLE', { title: selectedServer?.title })}
        </WelcomeTitle>
        <LoginDivider />
        {isRegularLogin &&
          oauthServers.map((server: Server) => (
            <OauthButton
              key={server.url}
              data-url={server.url}
              onClick={() => {
                handleOAuthLogin(server);
              }}
            >
              <span>{t('LOG_IN_WITH_TITLE', { title: server?.title })}</span>
            </OauthButton>
          ))}
        {errorMessage && (
          <Alert className="login-alert" type="error" showIcon={false}>
            {t(errorMessage)}
          </Alert>
        )}
        <Form
          className="login-form"
          size="md"
          initialValues={{ username: 'an', password: 'P@88w0rd' }}
          onFinish={loginMutation.mutate}
        >
          <FormItem
            label={
              isRegularLogin
                ? t('USERNAME_OR_EMAIL')
                : t('USERNAME_WITH_TITLE', { title: selectedServer?.title })
            }
            name="username"
            className="username"
            rules={[
              {
                required: true,
                message: t('INPUT_USERNAME_OR_EMAIL_TIP'),
              },
            ]}
          >
            <Input placeholder="user@example.com" />
          </FormItem>
          <FormItem
            label={t('PASSWORD')}
            name="password"
            rules={[{ required: true, message: t('PASSWORD_EMPTY_DESC') }]}
          >
            <InputPassword placeholder="Password" />
          </FormItem>
          <LoginButton>
            <Button
              color="secondary"
              block
              shadow
              radius="xl"
              loading={loginMutation.isLoading || waitRedirect}
            >
              {t('LOG_IN')}
            </Button>
            {!isRegularLogin && (
              <BackButton variant="text" block onClick={handleBack}>
                {t('BACK')}
              </BackButton>
            )}
          </LoginButton>
        </Form>
      </Card>
    </LoginWrapper>
  );
};

export default Login;
