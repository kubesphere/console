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
import { Column, Columns, Form, Input } from '@kube-design/components'

import styles from './index.scss'

export default class SELinuxOptions extends React.Component {
  get prefix() {
    return this.props.prefix || 'securityContext'
  }

  render() {
    return (
      <div className="margin-b12">
        <div className={styles.title}>{t('SELINUX_CONTEXT')}</div>
        <div className={styles.content}>
          <Columns>
            <Column>
              <Form.Item label={t('LEVEL')}>
                <Input name={`${this.prefix}.seLinuxOptions.level`} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('ROLE')}>
                <Input name={`${this.prefix}.seLinuxOptions.role`} />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Form.Item label={t('TYPE')}>
                <Input name={`${this.prefix}.seLinuxOptions.type`} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('USER')}>
                <Input name={`${this.prefix}.seLinuxOptions.user`} />
              </Form.Item>
            </Column>
          </Columns>
        </div>
      </div>
    )
  }
}
