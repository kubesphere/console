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
import { Form, Input } from '@kube-design/components'
import { ArrayInput } from 'components/Inputs'

import styles from './index.scss'

export default class AccessControl extends React.Component {
  get prefix() {
    return this.props.prefix || 'securityContext'
  }

  render() {
    return (
      <div className="margin-b12">
        <div className={styles.title}>{t('CAPABILITIES')}</div>
        <div className={styles.content}>
          <Form.Item label={t('ADD')}>
            <ArrayInput name={`${this.prefix}.capabilities.add`}>
              <Input />
            </ArrayInput>
          </Form.Item>
          <Form.Item label={t('DROP')}>
            <ArrayInput name={`${this.prefix}.capabilities.drop`}>
              <Input />
            </ArrayInput>
          </Form.Item>
        </div>
      </div>
    )
  }
}
