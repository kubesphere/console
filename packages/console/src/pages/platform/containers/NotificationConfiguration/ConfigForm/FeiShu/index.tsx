/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Tab, Tabs, Text, FormItem, Input } from '@kubed/components';

import { notifyError } from '../utils';
import ListInput from '../components/ListInput';
import type { ConfigFormData } from '../types';

import { ItemWrapper, Wrapper } from '../styles';

type Props = {
  formData?: ConfigFormData;
  user?: string;
};

function FeiShu({ formData, user }: Props): JSX.Element {
  // todo: should use the same checker?
  function validator(value: string): boolean {
    const count = globals.config.notification.feishu.max_number_of_keyword;
    const keywords: string[] = get(formData, 'receiver.spec.feishu.chatbot.keywords', []);

    if (!value) {
      notifyError(t('ENTER_KEYWORD_DESC'));
      return false;
    }

    if (keywords.length > count - 1) {
      notifyError(<span dangerouslySetInnerHTML={{ __html: t('MAX_KEYWORD_COUNT', { count }) }} />);
      return false;
    }

    if (keywords.includes(value)) {
      notifyError(t('KEYWORD_EXISTS'));
      return false;
    }

    return true;
  }

  return (
    <Wrapper>
      <Tabs>
        <Tab label={t('CHAT_SETTINGS')} key="conversation" name="conversation">
          <>
            {!user && (
              <>
                <Text className="title">{t('APP_SETTINGS')}</Text>
                <ItemWrapper className="mb12">
                  <FormItem label="App ID" name={['secret', 'data', 'appkey']}>
                    <Input className="input-item" />
                  </FormItem>
                  <FormItem label="App Secret" name={['secret', 'data', 'appsecret']}>
                    <Input className="input-item" />
                  </FormItem>
                </ItemWrapper>
              </>
            )}
            <Text className="title">{t('RECIPIENT_SETTINGS')}</Text>
            <ItemWrapper className="mb12">
              <Tabs>
                <Tab label="User ID" key="conversation" name="conversation">
                  <FormItem name={['receiver', 'spec', 'feishu', 'user']}>
                    <ListInput
                      title={t('')}
                      listTitle={t('TOUSER_LIST')}
                      emptyDesc={t('EMPTY_TOUSER_DESC')}
                      placeholder=" "
                      validator={validator}
                    />
                  </FormItem>
                </Tab>
                <Tab label={'Department ID'} key="chatbot" name="chatbot">
                  <FormItem name={['receiver', 'spec', 'feishu', 'department']}>
                    <ListInput
                      title={t('')}
                      listTitle={t('TOPARTY_LIST')}
                      emptyDesc={t('EMPTY_TOPARTY_DESC')}
                      placeholder=" "
                      validator={validator}
                    />
                  </FormItem>
                </Tab>
              </Tabs>
            </ItemWrapper>
          </>
        </Tab>
        <Tab label={t('CHATBOT_SETTINGS')} key="chatbot" name="chatbot">
          <Text className="title">{t('CHATBOT_SETTINGS')}</Text>
          <ItemWrapper className="mb12">
            <FormItem label={t('Webhook URL')} name={['secret', 'data', 'webhook']}>
              <Input className="input-item" />
            </FormItem>
            <FormItem label={'Secret'} name={['secret', 'data', 'chatbotsecret']}>
              <Input className="input-item" />
            </FormItem>
            <FormItem name={['receiver', 'spec', 'feishu', 'chatbot', 'keywords']}>
              <ListInput validator={validator} />
            </FormItem>
          </ItemWrapper>
        </Tab>
      </Tabs>
    </Wrapper>
  );
}

export default FeiShu;
