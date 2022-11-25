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
import { get, isEmpty } from 'lodash'

import { Form, Input, Notify } from '@kube-design/components'
import { RadioGroup } from 'components/Base'

import BaseForm from '../BaseForm'
import Item from './Item'

import styles from './index.scss'

export default class WeComForm extends Component {
  state = {
    type: 'toUser',
  }

  get tabs() {
    return [
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
    ]
  }

  validate = value => {
    const { type } = this.state
    const data = get(this.props.data, `receiver.spec.wechat.${type}`, [])
    const count = globals.config.notification.wecom[`max_number_of_${type}`]
    if (!value) {
      Notify.error({
        content: t(`ENTER_${type.toUpperCase()}_TIP`),
        duration: 1000,
      })
      return
    }
    if (data.length > count - 1) {
      Notify.error({
        content: t.html(`MAX_${type.toUpperCase()}_COUNT`, { count }),
        duration: 1000,
      })
      return
    }
    if (data.includes(value)) {
      Notify.error({
        content: t(`${type.toUpperCase()}_EXISTS`),
        duration: 1000,
      })
      return
    }
    return true
  }

  receiverValidator = (rule, value, callback) => {
    if (
      ['toParty', 'toUser', 'toTag'].every(item =>
        isEmpty(get(this.props.data, `receiver.spec.wechat.${item}`))
      )
    ) {
      return callback({ message: t('RECIPIENT_SETTINGS_TIP') })
    }
    callback()
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  renderServiceSetting() {
    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('SERVER_SETTINGS')}</div>
        <div className={styles.item}>
          <Form.Item
            label="Corp ID"
            rules={[
              {
                required: true,
                message: t('ENTER_WECOM_CORP_ID_DESC'),
              },
            ]}
          >
            <Input name="config.spec.wechat.wechatApiCorpId" />
          </Form.Item>
          <Form.Item
            label="Agent ID"
            rules={[
              {
                required: true,
                message: t('ENTER_WECOM_AGENT_ID_DESC'),
              },
            ]}
          >
            <Input name="config.spec.wechat.wechatApiAgentId" />
          </Form.Item>
          <Form.Item
            label="Secret"
            rules={[
              {
                required: true,
                message: t('ENTER_WECOM_SECRET_DESC'),
              },
            ]}
          >
            <Input name="secret.data.appsecret" />
          </Form.Item>
        </div>
      </div>
    )
  }

  renderReceiverSetting() {
    const { type } = this.state
    const { wrapperClassName } = this.props

    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('RECIPIENT_SETTINGS')}</div>
        <div className={styles.subTitle}>{t('RECIPIENT_SETTINGS_TIP')}</div>
        <div className={styles.item}>
          <div className="margin-b12">
            <RadioGroup
              value={type}
              onChange={this.handleTypeChange}
              options={this.tabs}
            />
          </div>
          <Form.Item rules={[{ validator: this.receiverValidator }]}>
            <Item
              name={`receiver.spec.wechat.${type}`}
              className={wrapperClassName}
              validate={this.validate}
              type={type}
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
        name="wechat"
        module="WeCom"
        icon="wecom"
        data={data}
        onChange={onChange}
        hideFooter={hideFooter}
        user={user}
        {...rest}
      >
        {!user && this.renderServiceSetting()}
        {this.renderReceiverSetting()}
      </BaseForm>
    )
  }
}
