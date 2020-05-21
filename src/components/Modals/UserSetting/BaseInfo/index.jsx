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
import { Input, Select, Columns, Column } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { getBrowserLang } from 'utils'
import cookie from 'utils/cookie'

import styles from './index.scss'

export default class BaseInfo extends React.Component {
  static contextTypes = {
    registerUpdate: PropTypes.func,
  }

  get name() {
    return 'basicInfo'
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
    const { formRef, formData } = this.props
    return (
      <div className={styles.wrapper}>
        <div className="h4">{t('Basic Info')}</div>
        <Form data={formData} ref={formRef} onChange={this.handleFormChange}>
          <Columns>
            <Column>
              <Form.Item label={t('User Name')}>
                <Input name="metadata.name" placeholder="username" disabled />
              </Form.Item>
              <Form.Item label={t('Email')} desc={t('USER_SETTING_EMAIL_DESC')}>
                <Input name="spec.email" placeholder="User@example.com" />
              </Form.Item>
              {globals.config.supportLangs && (
                <Form.Item label={t('Language')}>
                  <Select
                    name="spec.lang"
                    options={globals.config.supportLangs}
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
