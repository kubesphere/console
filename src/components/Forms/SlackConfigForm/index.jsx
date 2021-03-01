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
import { get } from 'lodash'

import { Form, Button, Alert, TextArea } from '@kube-design/components'

import { safeBtoa } from 'utils/base64'

import styles from './index.scss'

export default class SlackConfigForm extends Component {
  state = {
    showSecret: false,
  }

  convert = value => {
    const { showSecret } = this.state
    return showSecret ? value : safeBtoa(value)
  }

  handleChangeSecretState = () => {
    this.setState(({ showSecret }) => ({
      showSecret: !showSecret,
    }))
  }

  render() {
    return (
      <Form data={this.props.data} onSubmit={this.props.onSubmit}>
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
    if (this.props.isEdit && this.props.showTip) {
      return (
        <Alert
          className={styles.tips}
          type="error"
          message={t('SLACK_CONFIG_CHANGE_NEED_SAVE_TIP')}
        />
      )
    }
    return null
  }

  renderFormItems() {
    const { data, formStatus, onChange, isEdit, onChangeMode } = this.props
    const { showSecret } = this.state

    return (
      <div className={styles.operationWrapper}>
        <Form.Item
          label={t('Slack Token')}
          rules={[{ required: isEdit, message: t('Please input slack token') }]}
        >
          {isEdit || formStatus === 'create' ? (
            <TextArea
              name="spec.slackTokenSecret.key"
              className="max-width-full"
              onChange={onChange}
            />
          ) : (
            <div className={styles.tokenWrapper}>
              {this.convert(get(data, 'spec.slackTokenSecret.key'))}
            </div>
          )}
        </Form.Item>
        <div className={styles.buttonWrapper}>
          {formStatus === 'update' && (
            <Button type="flat" icon={'pen'} onClick={onChangeMode} />
          )}
          {formStatus === 'update' && !isEdit && (
            <Button
              type="flat"
              icon={showSecret ? 'eye-closed' : 'eye'}
              onClick={this.handleChangeSecretState}
            />
          )}
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
          htmlType="submit"
          loading={this.props.isSubmitting}
        >
          {this.props.formStatus === 'update' ? t('Update') : t('Save')}
        </Button>
      </>
    )
  }
}
