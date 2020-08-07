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

import { Form } from 'components/Base'
import { Input, Select } from '@pitrix/lego-ui'

import CustomMonitorMetircQueryInput from '../../MetircQueryInput'
import FormItemContainer from '../ItemContianer'
import Field from '../Field'

import styles from './index.scss'

export default class SingleStatDataForm extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.config}>
          <Form.Item
            rules={[{ required: true, message: t('Please input name') }]}
          >
            <FormItemContainer name={'title'}>
              {({ onChange, value }) => (
                <Field label={t('GRAPH_NAME')} tips={''}>
                  <Input
                    className={styles.input}
                    value={value}
                    onChange={onChange}
                  />
                </Field>
              )}
            </FormItemContainer>
          </Form.Item>

          <Form.Item>
            <FormItemContainer name={'format'} defaultValue={'memory'}>
              {({ onChange, value }) => (
                <Field label={t('Unit')} tips={''}>
                  <Select
                    options={[
                      {
                        label: 'memory',
                        value: 'memory',
                      },
                      {
                        label: 'disk',
                        value: 'disk',
                      },
                    ]}
                    value={value}
                    onChange={onChange}
                  />
                </Field>
              )}
            </FormItemContainer>
          </Form.Item>
        </div>
        <div className={styles.metric}>
          <Form.Item>
            <CustomMonitorMetircQueryInput
              name={'targets[0].expr'}
              supportMetrics={this.props.supportMetrics}
            />
          </Form.Item>
        </div>
      </div>
    )
  }
}
