/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { FormItem, Input, InputPassword, LabeledValue, Select, Text } from '@kubed/components';

import type { ConfigFormData } from '../types';
import CheckboxFormItem from '../components/CheckboxFormItem';

import { ItemWrapper } from '../styles';
import { WebHookWrapper } from './styles';

type Props = {
  formData: ConfigFormData;
};

function Webhook({ formData }: Props): JSX.Element {
  const options: LabeledValue[] = [
    {
      label: t('NO_AUTH'),
      value: 'no',
    },
    {
      label: t('BEARER_TOKEN'),
      value: 'token',
    },
    {
      label: t('BASIC_AUTH'),
      value: 'basic',
    },
  ];

  function renderVerifySettingsByType(): JSX.Element {
    const type: string = get(
      formData,
      'receiver.metadata.annotations["kubesphere.io/verify-type"]',
      '',
    );

    if (type === 'token') {
      return (
        <>
          <FormItem
            label={t('TOKEN')}
            name={['secret', 'data', 'token']}
            rules={[{ required: true, message: t('WEBHOOK_TOKEN_EMPTY_DESC') }]}
          >
            <Input className="input-item" />
          </FormItem>
        </>
      );
    }

    if (type === 'basic') {
      return (
        <>
          <FormItem
            label={t('USERNAME')}
            name={['receiver', 'spec', 'webhook', 'httpConfig', 'basicAuth', 'username']}
            rules={[{ required: true, message: t('WEBHOOK_USERNAME_EMPTY_DESC') }]}
          >
            <Input className="input-item" />
          </FormItem>
          <FormItem
            label={t('PASSWORD')}
            name={['secret', 'data', 'password']}
            rules={[{ required: true, message: t('WEBHOOK_PASSWORD_EMPTY_DESC') }]}
          >
            <InputPassword className="input-item" type="password" autoComplete="new-password" />
          </FormItem>
        </>
      );
    }

    return <></>;
  }

  return (
    <WebHookWrapper>
      <Text className="title">{t('SERVER_SETTINGS')}</Text>
      <ItemWrapper className="mb12">
        <FormItem
          label="Webhook URL"
          name={['receiver', 'spec', 'webhook', 'url']}
          rules={[{ required: true, message: t('WEBHOOK_URL_DESC') }]}
        >
          <Input className="input-item" />
        </FormItem>
        <FormItem
          label={t('AUTHENTICATION_TYPE')}
          name={['receiver', 'metadata', 'annotations', 'kubesphere.io/verify-type']}
          rules={[
            {
              required: true,
              message: t('AUTHENTICATION_TYPE_DESC'),
            },
          ]}
        >
          <Select options={options} />
        </FormItem>
        {renderVerifySettingsByType()}
        <FormItem
          name={['receiver', 'spec', 'webhook', 'httpConfig', 'tlsConfig', 'insecureSkipVerify']}
        >
          <CheckboxFormItem label={t('SKIP_TLS_VERFICATION')} />
        </FormItem>
      </ItemWrapper>
    </WebHookWrapper>
  );
}

export default Webhook;
