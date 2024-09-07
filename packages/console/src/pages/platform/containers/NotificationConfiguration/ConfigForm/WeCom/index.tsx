/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { get, isEmpty } from 'lodash';
import { RuleObject } from 'rc-field-form/lib/interface';
import { Text, Input, FormItem, Navs } from '@kubed/components';

import { notifyError } from '../utils';
import type { ConfigFormData } from '../types';
import ListInput from '../components/ListInput';
import type { LabelValue } from '../../../../types';

import { SubTitle } from './styles';
import { ItemWrapper, Wrapper } from '../styles';

type Props = {
  formData: ConfigFormData;
  user?: string;
};

const receiverTabs: LabelValue[] = [
  {
    label: 'User ID',
    value: 'toUser',
  },
  {
    label: 'Department ID',
    value: 'toParty',
  },
  {
    label: 'Tag ID',
    value: 'toTag',
  },
];
function WeCom({ formData, user }: Props): JSX.Element {
  const [type, setType] = useState<string>('toUser');

  function receiverRuleValidator(
    rule: RuleObject,
    value: string[],
    callback: (error?: string) => void,
  ): Promise<any> | void {
    if (
      ['toParty', 'toUser', 'toTag'].every(item =>
        isEmpty(get(formData, `receiver.spec.wechat.${item}`)),
      )
    ) {
      return callback(t('RECIPIENT_SETTINGS_TIP'));
    }
    callback();
  }

  function receiverValuesValidator(value: string): boolean {
    const count = globals.config.notification.wecom[`max_number_of_${type}`];
    const receiverValues: string[] = get(formData, `receiver.spec.wechat.${type}`, []);

    if (!value) {
      notifyError(t(`ENTER_${type.toUpperCase()}_TIP`));
      return false;
    }
    if (receiverValues.length > count - 1) {
      notifyError(
        <span
          dangerouslySetInnerHTML={{ __html: t(`MAX_${type.toUpperCase()}_COUNT`, { count }) }}
        />,
      );
      return false;
    }
    if (receiverValues.includes(value)) {
      notifyError(t(`${type.toUpperCase()}_EXISTS`));
      return false;
    }

    return true;
  }

  function handleTypeChange(typeKey: string): void {
    setType(typeKey);
  }

  return (
    <Wrapper>
      {!user && (
        <>
          <Text className="title" style={{ marginTop: '0' }}>
            {t('SERVER_SETTINGS')}
          </Text>
          <ItemWrapper className="mb12">
            <FormItem
              label="Corp ID"
              name={['config', 'spec', 'wechat', 'wechatApiCorpId']}
              rules={[
                {
                  required: true,
                  message: t('ENTER_WECOM_CORP_ID_DESC'),
                },
              ]}
            >
              <Input className="input-item" />
            </FormItem>
            <FormItem
              label="Agent ID"
              name={['config', 'spec', 'wechat', 'wechatApiAgentId']}
              rules={[
                {
                  required: true,
                  message: t('ENTER_WECOM_AGENT_ID_DESC'),
                },
              ]}
            >
              <Input className="input-item" />
            </FormItem>
            <FormItem
              label="Secret"
              name={['secret', 'data', 'appsecret']}
              rules={[
                {
                  required: true,
                  message: t('ENTER_WECOM_SECRET_DESC'),
                },
              ]}
            >
              <Input className="input-item" />
            </FormItem>
          </ItemWrapper>
        </>
      )}
      <Text className="title" style={{ marginBottom: 0 }}>
        {t('RECIPIENT_SETTINGS')}
      </Text>
      <SubTitle>{t('RECIPIENT_SETTINGS_TIP')}</SubTitle>
      <ItemWrapper className="mb12">
        <Navs className="mb12" value={type} onChange={handleTypeChange} data={receiverTabs} />
        <FormItem
          name={['receiver', 'spec', 'wechat', type]}
          rules={[{ validator: receiverRuleValidator }]}
        >
          <ListInput
            listTitle={t(`${type.toUpperCase()}_LIST`)}
            emptyDesc={t(`EMPTY_${type.toUpperCase()}_DESC`)}
            validator={receiverValuesValidator}
          />
        </FormItem>
      </ItemWrapper>
    </Wrapper>
  );
}

export default WeCom;
