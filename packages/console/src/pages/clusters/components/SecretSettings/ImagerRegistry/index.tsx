/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState, forwardRef, useImperativeHandle, Ref } from 'react';
import { Success } from '@kubed/icons';
import { debounce, get, has, set } from 'lodash';
import { Alert, Button, Col, Input, InputPassword, Row } from '@kubed/components';

import { safeBtoa, clusterStore, parser, secretStore } from '@ks-console/shared';

interface Props {
  fedFormTemplate: object;
  cluster?: string;
  namespace?: string;
  isFederated?: any;
  screatName: string;
  [propName: string]: any;
}
import Wrapper from './Wrapper';
import SchemeInput from '../../SchemeInput';

import { PasswordItem, Tip, ImagerWrapper } from '../styles';

import { FormItemRef } from '../index';

const { fetchList } = clusterStore;

const { validateImageRegistrySecret } = secretStore;

function ImagerRegistry(
  { namespace, cluster, fedFormTemplate, screatName, isFederated, onChange, value }: Props,
  ref: Ref<FormItemRef>,
) {
  const [url, setUrl] = useState<string>('');
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [reason, setReason] = useState('');
  const [validate, setValidate] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    const valueObj = parser.safeParseJSON(value);
    const newUrl = Object.keys(get(valueObj, 'auths', {}))[0] || '';
    const infoObj = Object.values(get(valueObj, 'auths', {}))[0] || '';

    setUsername(get(infoObj, 'username'));
    setPassword(get(infoObj, 'password'));
    setEmail(get(infoObj, 'email'));
    setUrl(newUrl);
  }, []);

  const validateFun = () => {
    if (!url || !username || !password) {
      setErrorMsg(t('IMAGE_REGISTRY_REQUIRED_DESC'));

      return false;
    }
    return true;
  };

  useImperativeHandle(ref, () => {
    return {
      validateFun,
    };
  });

  const handleAnnotationsByUrl = () => {
    const registryUrl = url.replace(/^(http(s)?:\/\/)?(.*)$/, '$1').replace('://', '');

    if (registryUrl === 'http') {
      const annotations = get(fedFormTemplate, 'metadata.annotations', {});
      set(fedFormTemplate, 'metadata.annotations', {
        ...annotations,
        'secret.kubesphere.io/force-insecure': 'true',
      });
    } else {
      const annotations = get(fedFormTemplate, 'metadata.annotations', {});

      if (has(annotations, 'secret.kubesphere.io/force-insecure')) {
        delete annotations['secret.kubesphere.io/force-insecure'];
      }

      set(fedFormTemplate, 'metadata.annotations', {
        ...annotations,
      });
    }
  };

  const triggerChange = debounce(({ new_username, new_url, new_password, new_email }) => {
    setErrorMsg('');
    if (url && username && password) {
      handleAnnotationsByUrl();

      onChange(
        JSON.stringify({
          auths: {
            [new_url || url]: {
              username: new_username || username,
              password: new_password || password,
              email: new_email || email,
              auth: safeBtoa(`${new_username || username}:${new_password || password}`),
            },
          },
        }),
      );
    }
  }, 200);

  const getHostName = async (params = {}) => {
    const { data: hostData = [] } = fetchList({
      ...params,
      labelSelector: 'cluster-role.kubesphere.io/host=',
      limit: -1,
    });
    const host = hostData.filter((item: any) =>
      Object.keys(item.labels).some(key => key.endsWith('cluster-role.kubesphere.io/host')),
    );
    return get(host[0], 'name') ?? 'host';
  };

  const handleValidate = async () => {
    if (validateFun()) {
      setIsValidating(true);
      const result =
        (await validateImageRegistrySecret({
          fedFormTemplate: fedFormTemplate,
          name: screatName,
          namespace,
          cluster: isFederated ? await getHostName() : cluster,
        })) || {};
      setIsValidating(false);
      setReason(result.reason || '');
      setValidate(result.validate || '');
    }
  };

  const handleUrlChange = (v: string) => {
    setUrl(v);
    triggerChange({ new_url: v });
  };

  const handleUserNameChange = (e: any) => {
    setUsername(e.target.value);
    triggerChange({ new_username: e.target.value });
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    triggerChange({ new_email: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    triggerChange({ new_password: e.target.value });
  };

  const renderTip = () => {
    if (errorMsg) {
      return (
        <Alert className="margin-t12" type="error">
          {errorMsg}
        </Alert>
      );
    }

    if (validate) {
      return (
        <Alert type="info" icon={<Success size={20} style={{ fill: '#ffffff' }} />}>
          {t('REGISTRY_SECRET_VER_SUC')}
        </Alert>
      );
    }

    if (reason) {
      return (
        <Alert type="error" title={t('REGISTRY_SECRET_VER_ERR')}>
          {reason}
        </Alert>
      );
    }

    return (
      <Alert type="info" showIcon={false}>
        {t('IMAGE_REGISTRY_VALIDATE_TIP')}
      </Alert>
    );
  };

  return (
    <ImagerWrapper>
      <input name="username" className="hidden-input" type="text" disabled />
      <input name="password" className="hidden-input" type="password" disabled />
      <Row className="columns">
        <Col span={6} className="colunm">
          <Wrapper label={t('REGISTRY_ADDRESS_TCAP')} desc={t('REGISTRY_ADDRESS_TIP')} required>
            <SchemeInput value={url} onChange={handleUrlChange} />
          </Wrapper>
        </Col>
        <Col span={6} className="colunm">
          <Wrapper label={t('USERNAME')} required>
            <Input value={username} onChange={handleUserNameChange} autoComplete="nope" />
          </Wrapper>
        </Col>
      </Row>
      <Row className="columns">
        <Col span={6} className="colunm">
          <Wrapper label={t('EMAIL')}>
            <Input value={email} onChange={handleEmailChange} />
          </Wrapper>
        </Col>
        <Col span={6} className="colunm">
          <Wrapper label={t('PASSWORD')} required>
            <PasswordItem>
              <InputPassword
                type="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="new-password"
              />
              <Button onClick={handleValidate} loading={isValidating}>
                {t('VALIDATE')}
              </Button>
            </PasswordItem>
          </Wrapper>
        </Col>
      </Row>
      <Tip>{renderTip()}</Tip>
    </ImagerWrapper>
  );
}

export default forwardRef(ImagerRegistry);
