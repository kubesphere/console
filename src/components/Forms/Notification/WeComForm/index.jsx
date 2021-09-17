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
        label: t('User ID'),
        value: 'toUser',
      },
      {
        label: t('Party ID'),
        value: 'toParty',
      },
      {
        label: t('Tag ID'),
        value: 'toTag',
      },
    ]
  }

  validate = value => {
    const { type } = this.state
    const data = get(this.props.data, `receiver.spec.wechat.${type}`, [])
    const count = globals.config.notification.wecom[`max_number_of_${type}`]
    if (!value) {
      Notify.error({ content: t(`Please enter a ${type}`), duration: 1000 })
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
        content: t(`This ${type} has existed`),
        duration: 1000,
      })
      return
    }
    return true
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  renderServiceSetting() {
    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('Server Settings')}</div>
        <div className={styles.item}>
          <Form.Item
            label={t('WeChat API Corp ID')}
            rules={[
              {
                required: true,
                message: t('Please enter the WeChat API Corp ID'),
              },
            ]}
          >
            <Input name="config.spec.wechat.wechatApiCorpId" />
          </Form.Item>
          <Form.Item
            label={t('WeChat API Agent ID')}
            rules={[
              {
                required: true,
                message: t('Please enter the WeChat API Agent ID'),
              },
            ]}
          >
            <Input name="config.spec.wechat.wechatApiAgentId" />
          </Form.Item>
          <Form.Item
            label={t('WeChat API Secret')}
            rules={[
              {
                required: true,
                message: t('Please enter the WeChat API Secret'),
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
        <div className={styles.title}>{t('Recipient Settings')}</div>
        <div className={styles.subTitle}>{t('RECIPIENT_SETTINGS_TIP')}</div>
        <div className={styles.item}>
          <div className="margin-b12">
            <RadioGroup
              value={type}
              onChange={this.handleTypeChange}
              options={this.tabs}
            />
          </div>
          <Form.Item>
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
        name="wecom"
        module="wecom"
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
