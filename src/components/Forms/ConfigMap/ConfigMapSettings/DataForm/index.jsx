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

import React from 'react'
import PropTypes from 'prop-types'
import { trim } from 'lodash'
import { Input } from '@pitrix/lego-ui'
import { Form, TextArea } from 'components/Base'
import { ReactComponent as BackIcon } from 'src/assets/back.svg'

import styles from './index.scss'

export default class SecretDataForm extends React.Component {
  static defaultProps = {
    detail: {},
    selectKey: '',
  }

  static contextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  formRef = React.createRef()

  state = {
    formData: this.getFormData(),
  }

  componentDidMount() {
    this.registerForm()
  }

  registerForm = () => {
    const { registerSubRoute } = this.context
    const { onCancel } = this.props

    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)
  }

  handleGoBack = () => {
    const { resetSubRoute } = this.context

    resetSubRoute && resetSubRoute()

    this.props.onCancel()
  }

  getFormData() {
    const { detail, selectKey } = this.props

    return {
      key: selectKey || '',
      value: detail[selectKey] || '',
    }
  }

  handleSubmit = callback => {
    const { onOk } = this.props
    const form = this.formRef && this.formRef.current

    form &&
      form.validate(() => {
        const { key, value } = form.getData()
        onOk({ [trim(key)]: value })
        callback && callback()
      })
  }

  render() {
    const { detail, selectKey } = this.props

    return (
      <div className={styles.wrapper}>
        <div className="h6">
          <a className="custom-icon" onClick={this.handleGoBack}>
            <BackIcon />
          </a>
          {!detail[selectKey] ? t('Add Data') : t('Edit Data')}
        </div>
        <div className={styles.formWrapper}>
          <Form data={this.state.formData} ref={this.formRef}>
            <Form.Item
              label={t('DATA-KEY')}
              description={t(
                'The unique key value of this configuration map entry'
              )}
            >
              <Input name="key" placeholder="key" />
            </Form.Item>
            <Form.Item
              label={t('DATA-VALUE')}
              description={t(
                'Enter the value of the configuration map entry or use the contents of the file'
              )}
            >
              <TextArea
                maxHeight={430}
                autoResize
                resize
                name="value"
                placeholder="value"
                rows={4}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
