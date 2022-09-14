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

import { Form, Input } from '@kube-design/components'
import BaseForm from '../BaseForm'
import Item from './Item'

import styles from './index.scss'

export default class SlackForm extends Component {
  renderServiceSetting() {
    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('SERVER_SETTINGS')}</div>
        <div className={styles.item}>
          <Form.Item
            label={t('SLACK_TOKEN')}
            rules={[{ required: true, message: t('SLACK_TOKEN_DESC') }]}
          >
            <Input name="secret.data.token" />
          </Form.Item>
        </div>
      </div>
    )
  }

  renderReceiverSetting() {
    const { wrapperClassName } = this.props
    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('CHANNEL_SETTINGS')}</div>
        <div className={styles.item}>
          <Form.Item
            rules={[
              {
                required: true,
                message: t('ADD_CHANNEL_TIP'),
              },
            ]}
          >
            <Item
              name="receiver.spec.slack.channels"
              className={wrapperClassName}
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
        name="slack"
        module="slack"
        icon="slack"
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
