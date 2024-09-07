/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Text, FormItem, Input } from '@kubed/components';

import { notifyError } from '../utils';
import ListInput from '../components/ListInput';
import type { ConfigFormData } from '../types';

import { ItemWrapper, Wrapper } from '../styles';

type Props = {
  formData: ConfigFormData;
};

function Slack({ formData }: Props): JSX.Element {
  function validator(channel: string): boolean {
    const count = globals.config.notification.dingtalk.max_number_of_keyword;
    const value = get(formData, 'receiver.spec.slack.channels');

    if (!channel) {
      notifyError(t('ADD_CHANNEL_TIP'));
      return false;
    }

    if (value.length > count - 1) {
      notifyError(<span dangerouslySetInnerHTML={{ __html: t('MAX_CHANNEL_COUNT', { count }) }} />);
      return false;
    }

    if (value.some((val: string) => val === channel)) {
      notifyError(t('CHANNEL_EXISTS'));
      return false;
    }

    return true;
  }

  return (
    <Wrapper>
      <Text className="title">{t('SERVER_SETTINGS')}</Text>
      <ItemWrapper className="mb12">
        <FormItem
          label={t('SLACK_TOKEN')}
          name={['secret', 'data', 'token']}
          rules={[{ required: true, message: t('SLACK_TOKEN_DESC') }]}
        >
          <Input className="input-item" />
        </FormItem>
      </ItemWrapper>
      <Text className="title">{t('CHANNEL_SETTINGS')}</Text>
      <ItemWrapper className="mb12">
        <FormItem
          label={t('SLACK_CHANNEL')}
          name={['receiver', 'spec', 'slack', 'channels']}
          rules={[
            {
              required: true,
              message: t('ADD_CHANNEL_TIP'),
            },
          ]}
        >
          <ListInput
            validator={validator}
            listTitle={t('ADDED_CHANNELS')}
            emptyDesc={t('EMPTY_CHANNEL_DESC')}
          />
        </FormItem>
      </ItemWrapper>
    </Wrapper>
  );
}

export default Slack;
