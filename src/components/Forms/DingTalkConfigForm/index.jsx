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
import classnames from 'classnames'

import { Form, Button, Input, Alert } from '@kube-design/components'

import styles from './index.scss'

export default class DingTalkConfigForm extends Component {
  render() {
    return (
      <Form
        data={this.props.data}
        onChange={this.props.onChange}
        onSubmit={this.props.onSubmit}
      >
        <div
          className={classnames(styles.formBody, this.props.formBodyClassName)}
        >
          <div
            className={classnames(
              styles.formAttrs,
              this.props.formAttrsClassName
            )}
          >
            {this.renderTips()}
            {this.renderFormItems()}
          </div>
        </div>
        <div className={classnames(styles.footer, this.props.footerClassName)}>
          {this.renderFooterBtns()}
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
          message={t('DINGTALK_SERVER_SETTINGS_CHANGE_NEED_SAVE_TIP')}
        />
      )
    }
    return null
  }

  renderFormItems() {
    return (
      <>
        <div className={styles.row}>
          <Form.Item
            label={t('AppKey')}
            rules={[
              { required: true, message: t('Please input dingtalk app key') },
            ]}
          >
            <Input name="spec.conversation.appkey.key" />
          </Form.Item>
        </div>
        <div className={styles.row}>
          <Form.Item
            label={t('AppSecret')}
            rules={[
              {
                required: true,
                message: t('Please input dingtalk app secret'),
              },
            ]}
          >
            <Input name="spec.conversation.appsecret.key" />
          </Form.Item>
        </div>
      </>
    )
  }

  renderFooterBtns() {
    return (
      <>
        <Button onClick={this.props.onCancel}>{t('Cancel')}</Button>
        <Button
          type="control"
          htmlType="submit"
          loading={this.props.isSubmitting}
        >
          {this.props.formStatus === 'update' ? t('Update') : t('Save')}
        </Button>
      </>
    )
  }
}
