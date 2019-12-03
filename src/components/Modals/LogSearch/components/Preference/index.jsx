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
import { Select } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import PropTypes from 'prop-types'

import styles from './index.scss'

class SettingPreference extends Component {
  static propTypes = {
    settings: PropTypes.object,
    onChange: PropTypes.func,
  }

  handleChange = (key, value) => {
    this.props.onChange({ ...this.props.settings, [key]: value })
  }

  render() {
    const { settings } = this.props

    return (
      <Form data={settings} onChange={this.handleChange}>
        <div className={styles.wrapper}>
          <div>
            <h3>字体设置</h3>
            <div className={styles.settingFormGroup}>
              <div>
                <Form.Item label={'字体'}>
                  <Select
                    name="fontFamily"
                    options={[
                      { label: 'Monaco', value: 'Monaco' },
                      { label: 'Roboto', value: 'Roboto' },
                      { label: 'Proxima nova', value: 'inherit' },
                    ]}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item label={'字体大小'}>
                  <Select
                    name={'fontSize'}
                    options={[
                      { label: '12px', value: '12px' },
                      { label: '14px', value: '14px' },
                      { label: '16px', value: '16px' },
                      { label: '18px', value: '18px' },
                    ]}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item label={'字体粗细'}>
                  <Select
                    name={'fontWeight'}
                    options={[
                      { label: 'Normal', value: 'normal' },
                      { label: 'Bold', value: 'bold' },
                      { label: 'Lighter', value: 'lighter' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div>
            <h3>段落设置</h3>
            <div className={styles.settingFormGroup}>
              <div>
                <Form.Item label={'字体行高'}>
                  <Select
                    name={'lineHeight'}
                    options={[
                      { label: '18px', value: '18px' },
                      { label: '20px', value: '20px' },
                      { label: '22px', value: '22px' },
                      { label: '24px', value: '24px' },
                    ]}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item label={'文字溢出'}>
                  <Select
                    name={'whiteSpace'}
                    options={[
                      { label: t('Display'), value: 'pre-line' },
                      { label: t('Hidden'), value: 'nowrap' },
                    ]}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item label="段落分割线">
                  <Select
                    name={'borderBottom'}
                    options={[
                      { label: t('Display'), value: 'solid 1px #d8dee5' },
                      { label: t('Hidden'), value: 'none' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}

export default SettingPreference
