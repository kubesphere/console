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
import classnames from 'classnames'

import { Column, Columns, Form, Input } from '@kube-design/components'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

export default class UrlInput extends React.Component {
  static defaultProps = {
    hostName: 'Host',
    portName: 'Port',
    defaultPort: 9200,
    hostRules: [{ required: true, message: t('Please enter the address') }],
    portRules: [{ required: true, message: t('Please input port') }],
  }

  render() {
    const { className, readOnly } = this.props
    return (
      <Columns className={classnames(styles.columns, className)}>
        <Column className="is-7">
          <Form.Item rules={this.props.hostRules}>
            <Input
              name={this.props.hostName}
              placeholder={`${t('eg.')}192.168.1.10`}
              readOnly={readOnly}
            />
          </Form.Item>
        </Column>
        <Column>
          <Form.Item rules={this.props.portRules}>
            <NumberInput
              min={0}
              max={65535}
              name={this.props.portName}
              onChange={this.onPortChange}
              defaultValue={this.props.defaultPort}
              readOnly={readOnly}
              integer
            />
          </Form.Item>
        </Column>
      </Columns>
    )
  }
}
