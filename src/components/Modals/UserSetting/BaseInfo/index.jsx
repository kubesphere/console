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
import { Column, Columns, Form, Input, Select } from '@kube-design/components'
import { cloneDeep } from 'lodash'
import { getBrowserLang } from 'utils'
import cookie from 'utils/cookie'

import styles from './index.scss'

export default class BaseInfo extends React.Component {
  static contextTypes = {
    registerUpdate: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      formData: this.getInitialData(),
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.formData !== this.props.formData) {
      this.setState({ formData: this.getInitialData() })
    }
  }

  get name() {
    return 'basicInfo'
  }

  get languageOptions() {
    return globals.config.showAllLangs
      ? globals.config.supportLangs
      : globals.config.supportLangs.filter(item => item.recommend)
  }

  getInitialData() {
    return cloneDeep(this.props.formData)
  }

  resetData = () => {
    this.setState({
      formData: this.getInitialData(),
    })
  }

  handleFormChange = (name, value) => {
    this.context.registerUpdate(this.name, { name, value })
  }

  render() {
    const { formRef } = this.props
    return (
      <div className={styles.wrapper}>
        <div className="h4">{t('BASIC_INFORMATION')}</div>
        <Form
          ref={formRef}
          data={this.state.formData}
          onChange={this.handleFormChange}
        >
          <Columns>
            <Column>
              <Form.Item label={t('USERNAME')}>
                <Input name="metadata.name" placeholder="username" disabled />
              </Form.Item>
              <Form.Item label={t('EMAIL')} desc={t('USER_SETTING_EMAIL_DESC')}>
                <Input name="spec.email" placeholder="user@example.com" />
              </Form.Item>
              {globals.config.supportLangs && (
                <Form.Item label={t('LANGUAGE')}>
                  <Select
                    name="spec.lang"
                    options={this.languageOptions}
                    defaultValue={cookie('lang') || getBrowserLang()}
                  />
                </Form.Item>
              )}
            </Column>
          </Columns>
        </Form>
      </div>
    )
  }
}
