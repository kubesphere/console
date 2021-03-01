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

import { Form, Button, Input, Alert } from '@kube-design/components'
import { ArrayInput } from 'components/Inputs'

import { PATTERN_EMAIL } from 'utils/constants'

import styles from './index.scss'

export default class MailReceiverForm extends Component {
  emailValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }
    if (value.some(item => !item)) {
      return callback({ message: t('Please input email') })
    }
    if (value.some(item => item && !PATTERN_EMAIL.test(item))) {
      return callback({ message: t('Invalid email') })
    }
    callback()
  }

  render() {
    return (
      <Form
        data={this.props.data}
        onChange={this.props.onChange}
        onSubmit={this.props.onSubmit}
      >
        <div className={styles.formBody}>
          <div className={styles.formAttrs}>
            {this.renderTips()}
            <Form.Item
              rules={[
                { required: true, message: t('Please input email') },
                { validator: this.emailValidator, checkOnSubmit: true },
              ]}
            >
              <ArrayInput name="spec.to" addText={t('Add Email')}>
                <Input placeholder="user@example.com" />
              </ArrayInput>
            </Form.Item>
          </div>
        </div>
        <div className={styles.footer}>
          <Button onClick={this.props.onCancel}>{t('Cancel')}</Button>
          <Button
            type="control"
            htmlType="submit"
            loading={this.props.isSubmitting}
          >
            {this.props.formStatus === 'create' ? t('Save') : t('Update')}
          </Button>
        </div>
      </Form>
    )
  }

  renderTips() {
    if (this.props.showTip && this.props.formStatus === 'update') {
      return (
        <Alert
          className={styles.tips}
          type="error"
          message={t('MAIL_RECEIVER_CONFIG_CHANGE_NEED_SAVE_TIP')}
        />
      )
    }
    return null
  }
}
