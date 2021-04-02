/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
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
import {
  Form,
  Button,
  Input,
  Alert,
  Tag,
  Icon,
  Notify,
} from '@kube-design/components'
import { List, ToggleField } from 'components/Base'
import { BoxInput } from 'components/Inputs'

import styles from './index.scss'

export default class DingTalkForm extends Component {
  formRef = React.createRef()

  validateCid = value => {
    const data = get(
      this.props.data,
      'receiver.spec.dingtalk.conversation.chatids',
      []
    )
    const count = globals.config.notification.dingtalk['max_number_of_cid']
    if (!value) {
      Notify.error({
        content: t('Please enter a conversation ID'),
        durantion: 1000,
      })
      return
    }
    if (data.length > count - 1) {
      Notify.error({
        content: t.html('MAX_CID_COUNT', { count }),
        durantion: 1000,
      })
      return
    }
    if (data.includes(value)) {
      Notify.error({
        content: t(`This conversation ID has existed`),
        duration: 1000,
      })
      return
    }

    return true
  }

  validateKeywords = value => {
    const data = get(
      this.props.data,
      'receiver.spec.dingtalk.chatbot.keywords',
      []
    )
    const count = globals.config.notification.dingtalk['max_number_of_keyword']
    if (!value) {
      Notify.error({
        content: t('Please enter a keyword'),
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
        content: t(`This keyword has existed`),
        duration: 1000,
      })
      return
    }

    return true
  }

  handleSubmit = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        this.props.onSubmit(form.getData())
      })
  }

  render() {
    return (
      <Form
        ref={this.formRef}
        data={this.props.data}
        onChange={this.props.onChange}
      >
        <div className={styles.formBody}>
          {this.renderTips()}
          {this.renderFormItems()}
        </div>
        <div className={styles.footer}>{this.renderFooterBtns()}</div>
      </Form>
    )
  }

  renderTips() {
    if (this.props.showTip && this.props.formStatus === 'update') {
      return (
        <Alert
          className={styles.tips}
          type="error"
          message={t('DINGTALK_SETTINGS_CHANGE_NEED_SAVE_TIP')}
        />
      )
    }
    return null
  }

  renderFormItems() {
    const { data, onAdd } = this.props
    return (
      <>
        <div className={styles.row}>
          <div className={styles.title}>{t('Notification Settings')}</div>
          <div className={styles.item}>
            <Form.Item
              className={styles.isHorizon}
              label={t('Receive Notification')}
            >
              <ToggleField
                name="receiver.spec.dingtalk.enabled"
                value={get(data, 'receiver.spec.dingtalk.enabled')}
                onText={t('On')}
                offText={t('Off')}
              />
            </Form.Item>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>{t('Conversation Settings')}</div>
          <div className={styles.item}>
            <Form.Item label={t('AppKey')}>
              <Input name="secret.data.appkey" />
            </Form.Item>
            <Form.Item label={t('AppSecret')}>
              <Input name="secret.data.appsecret" />
            </Form.Item>
            <BoxInput
              className={styles.itemWrapper}
              title={t('Conversation ID')}
              placeholder={t('Please enter a conversation ID')}
              validate={this.validateCid}
              onAdd={value =>
                onAdd(value, 'receiver.spec.dingtalk.conversation.chatids')
              }
            />
            {this.renderList()}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>
            <span className="margin-r12">{t('DingTalk Chatbot')}</span>
          </div>
          <div className={styles.item}>
            <Form.Item label={t('Webhook URL')}>
              <Input name="secret.data.webhook" />
            </Form.Item>
            <BoxInput
              className={styles.itemWrapper}
              title={t('Keywords')}
              placeholder={t('Please enter a keyword')}
              validate={this.validateKeywords}
              onAdd={value =>
                onAdd(value, 'receiver.spec.dingtalk.chatbot.keywords')
              }
            />
            {this.renderKeywords()}
            <Form.Item label={t('Secret')}>
              <Input name="secret.data.chatbotsecret" />
            </Form.Item>
          </div>
        </div>
      </>
    )
  }

  renderList() {
    const { data, onDelete } = this.props
    const resources = get(
      data,
      'receiver.spec.dingtalk.conversation.chatids',
      []
    )
    if (!resources.length) {
      return null
    }
    return (
      <div className={styles.listWrapper}>
        <List>
          {resources.map(item => (
            <List.Item
              key={item}
              title={item}
              onDelete={() =>
                onDelete(item, 'receiver.spec.dingtalk.conversation.chatids')
              }
            />
          ))}
        </List>
      </div>
    )
  }

  renderKeywords() {
    const { data, onDelete } = this.props
    const keywordsList = get(
      data,
      'receiver.spec.dingtalk.chatbot.keywords',
      []
    )

    if (!keywordsList.length) {
      return null
    }
    return (
      <div>
        <p>{t('Keywords Set')}</p>
        <div className={styles.contentWrapper}>
          {keywordsList.map(item => {
            return (
              <Tag className={styles.tag} type="primary" key={item}>
                {item}
                <Icon
                  name="close"
                  size={12}
                  clickable
                  onClick={() =>
                    onDelete(item, 'receiver.spec.dingtalk.chatbot.keywords')
                  }
                ></Icon>
              </Tag>
            )
          })}
        </div>
      </div>
    )
  }

  renderFooterBtns() {
    return (
      <>
        <Button onClick={this.props.onCancel}>{t('Cancel')}</Button>
        <Button
          type="control"
          loading={this.props.isSubmitting}
          disabled={this.props.disableSubmit}
          onClick={this.handleSubmit}
        >
          {this.props.formStatus === 'update' ? t('Update') : t('Save')}
        </Button>
      </>
    )
  }
}
