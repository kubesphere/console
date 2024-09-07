/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Question } from '@kubed/icons';
import { Text, FormItem, Tabs, Tab, Tooltip, Input } from '@kubed/components';

import { notifyError } from '../utils';
import ListInput from '../components/ListInput';
import type { ConfigFormData } from '../types';

import { ItemWrapper, Wrapper } from '../styles';

type Props = {
  formData: ConfigFormData;
  user?: string;
};

function DingTalk({ formData, user }: Props): JSX.Element {
  function keywordValidator(value: string): boolean {
    const count = globals.config.notification.dingtalk.max_number_of_keyword;
    const keywords: string[] = get(formData, 'receiver.spec.dingtalk.chatbot.keywords', []);

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

  function chartIdValidator(value: string): boolean {
    const count = globals.config.notification.dingtalk.max_number_of_cid;
    const chartIds: string[] = get(formData, 'receiver.spec.dingtalk.conversation.chatids', []);

    if (!value) {
      notifyError(t('ENTER_CHAT_ID_DESC'));
      return false;
    }

    if (chartIds.length > count - 1) {
      notifyError(<span dangerouslySetInnerHTML={{ __html: t('MAX_KEYWORD_COUNT', { count }) }} />);
      return false;
    }

    if (chartIds.includes(value)) {
      notifyError(t('CHAT_ID_EXISTS'));
      return false;
    }

    return true;
  }

  return (
    <Wrapper>
      <Tabs>
        <Tab label={t('CHAT_SETTINGS')} key="conversation">
          <>
            {!user && (
              <>
                <Text className="title">{t('APP_SETTINGS')}</Text>
                <ItemWrapper className="mb12">
                  <FormItem label="App Key" name={['secret', 'data', 'appkey']}>
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
              <FormItem
                label={
                  <div className="labelWrapper">
                    <span>Chat ID</span>
                    {user && (
                      <Tooltip content={t('CHAT_ID_TIP')}>
                        <Question />
                      </Tooltip>
                    )}
                  </div>
                }
                name={['receiver', 'spec', 'dingtalk', 'conversation', 'chatids']}
              >
                <ListInput mode="items" validator={chartIdValidator} />
              </FormItem>
            </ItemWrapper>
          </>
        </Tab>
        <Tab label={t('CHATBOT_SETTINGS')} key="chatbot">
          <Text className="title">{t('CHATBOT_SETTINGS')}</Text>
          <ItemWrapper className="mb12">
            <FormItem label="Webhook URL" name={['secret', 'data', 'webhook']}>
              <Input className="input-item" />
            </FormItem>
            <FormItem label="Secret" name={['secret', 'data', 'chatbotsecret']}>
              <Input className="input-item" />
            </FormItem>
            <FormItem
              label={t('KEYWORD')}
              name={['receiver', 'spec', 'dingtalk', 'chatbot', 'keywords']}
            >
              <ListInput
                listTitle={t('KEYWORDS_LIST')}
                emptyDesc={t('EMPTY_KEYWORDS_DESC')}
                validator={keywordValidator}
              />
            </FormItem>
          </ItemWrapper>
        </Tab>
      </Tabs>
    </Wrapper>
  );
}

export default DingTalk;
