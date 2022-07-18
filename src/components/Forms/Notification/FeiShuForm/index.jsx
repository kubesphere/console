/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react'
import { get } from 'lodash'

import { Form, Input, Notify, Tabs } from '@kube-design/components'

import BaseForm from '../BaseForm'
import KeyWords from '../DingTalkForm/KeyWords'
import styles from './index.scss'

const { TabPanel } = Tabs

export default class FeishuForm extends Component {
  validateKeywords = value => {
    const data = get(
      this.props.data,
      'receiver.spec.feishu.chatbot.keywords',
      []
    )
    const count = globals.config.notification.feishu['max_number_of_keyword']
    if (!value) {
      Notify.error({
        content: t('ENTER_KEYWORD_DESC'),
        durantion: 1000,
      })
      return
    }
    if (data.length > count - 1) {
      Notify.error({
        content: t.html('MAX_KEYWORD_COUNT', { count }),
        durantion: 1000,
      })
      return
    }
    if (data.includes(value)) {
      Notify.error({
        content: t(`KEYWORD_EXISTS`),
        duration: 1000,
      })
      return
    }

    return true
  }

  renderServiceSetting() {
    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('CONVERSATION_SETTINGS')}</div>
        <div className={styles.item}>
          <Form.Item label={t('AppKey')}>
            <Input name="secret.data.appkey" />
          </Form.Item>
          <Form.Item label={t('AppSecret')}>
            <Input name="secret.data.appsecret" />
          </Form.Item>
        </div>
      </div>
    )
  }

  renderReceiverSetting() {
    const { wrapperClassName } = this.props

    return (
      <div className={styles.row}>
        <div className={styles.title}>
          <span>{t('RECIPIENT_SETTINGS')}</span>
          <p className={styles.subtitle}>至少需要配置一项方可接收通知</p>
        </div>
        <div className={styles.item}>
          <Tabs type="button">
            <TabPanel label={t('USER_ID')} name="conversation">
              <Form.Item>
                <KeyWords
                  className={wrapperClassName}
                  title={t('')}
                  listTitle={t('TOUSER_LIST')}
                  emptyDesc={t('EMPTY_TOUSER_DESC')}
                  placeholder={t('ENTER_TOUSER_TIP')}
                  name="receiver.spec.feishu.user"
                  validate={this.validateKeywords}
                />
              </Form.Item>
            </TabPanel>
            <TabPanel label={t('DEPARTMENT_ID')} name="chatbot">
              <Form.Item>
                <KeyWords
                  className={wrapperClassName}
                  title={t('')}
                  listTitle={t('TOPARTY_LIST')}
                  emptyDesc={t('EMPTY_TOPARTY_DESC')}
                  placeholder={t('ENTER_TOPARTY_TIP')}
                  name="receiver.spec.feishu.department"
                  validate={this.validateKeywords}
                />
              </Form.Item>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    )
  }

  renderChatSetting() {
    const { wrapperClassName } = this.props
    return (
      <div className={styles.row}>
        <div className={styles.title}>
          <span>{t('CHATBOT_SETTINGS')}</span>
        </div>
        <div className={styles.item}>
          <Form.Item label={t('Webhook URL')}>
            <Input name="secret.data.webhook" />
          </Form.Item>
          <Form.Item label={t('DINGTALK_SECRET')}>
            <Input name="secret.data.chatbotsecret" />
          </Form.Item>
          <Form.Item>
            <KeyWords
              className={wrapperClassName}
              name="receiver.spec.feishu.chatbot.keywords"
              validate={this.validateKeywords}
            />
          </Form.Item>
        </div>
      </div>
    )
  }

  render() {
    const { user, data, onChange, hideFooter, ...rest } = this.props

    return (
      <BaseForm
        name="feishu"
        module="Feishu"
        icon="feishu"
        data={data}
        onChange={onChange}
        hideFooter={hideFooter}
        user={user}
        {...rest}
      >
        <Tabs type="button">
          <TabPanel label={t('CONVERSATION_SETTINGS')} name="conversation">
            {!user && this.renderServiceSetting()}
            <>{this.renderReceiverSetting()}</>
          </TabPanel>
          <TabPanel label={t('CHATBOT_SETTINGS')} name="chatbot">
            {this.renderChatSetting()}
          </TabPanel>
        </Tabs>
      </BaseForm>
    )
  }
}
