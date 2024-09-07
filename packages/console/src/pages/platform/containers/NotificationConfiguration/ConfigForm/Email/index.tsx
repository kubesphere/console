/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Pattern } from '@ks-console/shared';
import type { RuleObject } from 'rc-field-form/lib/interface';
import { Text, Input, FormItem, InputPassword } from '@kubed/components';

import { notifyError } from '../utils';
import type { ConfigFormData } from '../types';
import ListInput from '../components/ListInput';
import UrlInput, { UrlInputValue } from '../components/UrlInput';
import CheckboxFormItem from '../components/CheckboxFormItem';

import { EmailWrapper } from './styles';
import { ItemWrapper } from '../styles';

type Props = {
  formData: ConfigFormData;
};

function Email({ formData }: Props): JSX.Element {
  function validator(val: string): boolean {
    const count = globals.config.notification.wecom.max_number_of_email;
    const values: string[] = get(formData, 'receiver.spec.email.to', []);

    if (!val) {
      notifyError(t('EMAIL_EMPTY_DESC'));
      return false;
    }

    if (values.length > count - 1) {
      notifyError(<span dangerouslySetInnerHTML={{ __html: t('MAX_EAMIL_COUNT', { count }) }} />);
      return false;
    }

    if (values.some(item => item === val)) {
      notifyError(t('EMAIL_EXISTS'));
      return false;
    }

    if (!Pattern.PATTERN_EMAIL.test(val)) {
      notifyError(t('INVALID_EMAIL'));
      return false;
    }

    return true;
  }

  function urlInputValidator(
    rule: RuleObject,
    { host, port }: UrlInputValue,
    callback: (error?: string) => void,
  ): Promise<any> | void {
    if (!host) {
      return callback(t('ADDRESS_EMPTY_DESC'));
    } else if (!Pattern.PATTERN_HOST.test(host)) {
      return callback(t('INVALID_ADDRESS_DESC'));
    } else if (!port) {
      return callback(t('ENTER_PORT_NUMBER'));
    } else if (!Pattern.PATTERN_PORT.test(port as any)) {
      return callback(t('INVALID_PORT_DESC'));
    }

    callback();
  }

  return (
    <EmailWrapper>
      <Text className="title" style={{ marginTop: '0' }}>
        {t('SERVER_SETTINGS')}
      </Text>
      <ItemWrapper className="mb12 base-mail">
        <FormItem
          label={t('SMTP_SERVER_ADDRESS')}
          name={['config', 'spec', 'email', 'smartHost']}
          rules={[{ validator: urlInputValidator }]}
        >
          <UrlInput />
        </FormItem>
        <FormItem name={['config', 'spec', 'email', 'requireTLS']}>
          <CheckboxFormItem label={t('USE_SSL_SECURE_CONNECTION')} />
        </FormItem>
        <FormItem
          label={t('SMTP_USER')}
          name={['config', 'spec', 'email', 'authUsername']}
          rules={[{ required: true, message: t('SMTP_USER_EMPTY_DESC') }]}
        >
          <Input className="input-item" placeholder={'admin@example.com'} autoComplete="off" />
        </FormItem>
        <FormItem
          label={t('SMTP_PASSWORD')}
          name={['secret', 'data', 'authPassword']}
          rules={[{ required: true, message: t('ENTER_PASSWORD_TIP') }]}
        >
          <InputPassword className="input-item" type="password" autoComplete="new-password" />
        </FormItem>
        <FormItem
          label={t('SENDER_EMAIL')}
          name={['config', 'spec', 'email', 'from']}
          rules={[
            { required: true, message: t('EMAIL_EMPTY_DESC') },
            { type: 'email', message: t('INVALID_EMAIL_ADDRESS_DESC') },
          ]}
        >
          <Input className="input-item" placeholder={'admin@example.com'} />
        </FormItem>
      </ItemWrapper>
      <Text className="title">{t('RECIPIENT_SETTINGS')}</Text>
      <ItemWrapper className="mb12 receiver">
        <FormItem
          name={['receiver', 'spec', 'email', 'to']}
          rules={[
            {
              required: true,
              message: t('ENTER_RECIPIENT_EMAIL_DESC'),
            },
          ]}
        >
          <ListInput mode="items" validator={validator} />
        </FormItem>
      </ItemWrapper>
    </EmailWrapper>
  );
}

export default Email;
