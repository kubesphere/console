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

import { get, isEmpty, unset } from 'lodash'
import React from 'react'
import { Alert, Form } from '@kube-design/components'

import { GRAY_RELEASE_CANARY_CONTENT } from 'utils/constants'
import CookieMatch from '../CookieMatch'
import HeaderMatch from '../HeaderMatch'
import OSSelect from '../OSSelect'

import styles from './index.scss'

export default class ByContent extends React.Component {
  get formTemplate() {
    return this.props.formTemplate.strategy
  }

  get prefix() {
    const protocol = get(this.formTemplate, 'spec.protocol', 'http')

    return `spec.template.spec.${protocol}[0]`
  }

  handleCookieChange = value => {
    // make HeaderMatch get the newest value
    this.setState({ cookie: value })
  }

  handleFormChange = (name, value) => {
    // unset empty option
    if (name === `${this.prefix}.match[0].headers.cookie`) {
      if (isEmpty(Object.values(value)[0])) {
        unset(this.formTemplate, name)
      }
    } else if (name === `${this.prefix}.match[0].headers`) {
      if (isEmpty(Object.keys(value)[0])) {
        unset(this.formTemplate, name)
      }
    } else if (name === `${this.prefix}.match[0].uri`) {
      if (isEmpty(Object.values(value)[0])) {
        unset(this.formTemplate, name)
      }
    } else if (name === `${this.prefix}.match[0].headers['User-Agent'].regex`) {
      if (isEmpty(value)) {
        unset(
          this.formTemplate,
          `${this.prefix}.match[0].headers['User-Agent']`
        )
      }
    }
  }

  render() {
    const { formRef, formTemplate, ...rest } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <Alert type="info" message={t('SPECIFY_REQUEST_PARAMETERS_DESC')} />
        </div>
        <div className={styles.item}>
          <div className={styles.title}>{t('REQUEST_PARAMETERS')}</div>
          <Form
            ref={formRef}
            data={this.formTemplate}
            onChange={this.handleFormChange}
            {...rest}
          >
            <Form.Item label={t('COOKIE')}>
              <CookieMatch
                name={`${this.prefix}.match[0].headers.cookie`}
                onChange={this.handleCookieChange}
                placeholder={t('KEY_EQ_VALUE')}
              />
            </Form.Item>
            <Form.Item label={t('HEADER')}>
              <HeaderMatch name={`${this.prefix}.match[0].headers`} />
            </Form.Item>
            <Form.Item label="URL">
              <CookieMatch
                name={`${this.prefix}.match[0].uri`}
                placeholder="URL"
                matchTypes={['prefix', 'regex']}
              />
            </Form.Item>
            <Form.Item label={t('CLIENT_OS')}>
              <OSSelect
                name={`${this.prefix}.match[0].headers['User-Agent'].regex`}
                options={GRAY_RELEASE_CANARY_CONTENT}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
