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
import { Form } from '@kube-design/components'

import ProbeInput from '../ProbeInput'

import styles from './index.scss'

export default class HealthChecker extends React.Component {
  static defaultProps = {
    prefix: '',
  }

  get prefix() {
    const { prefix } = this.props

    return prefix ? `${prefix}.` : ''
  }

  render() {
    return (
      <Form.Group
        label={t('LIFECYCLE_MANAGEMENT')}
        desc={t('LIFECYCLE_MANAGEMENT_DESC')}
        checkable
      >
        <Form.Item className={styles.item} label={t('POSTSTART_ACTION')}>
          <ProbeInput
            name={`${this.prefix}lifecycle.postStart`}
            label={t('ADD_ACTION')}
            description={t('POSTSTART_ACTION_DESC')}
            componentType="life"
            deleteNoObject={true}
          />
        </Form.Item>
        <Form.Item className={styles.item} label={t('PRESTOP_ACTION')}>
          <ProbeInput
            name={`${this.prefix}lifecycle.preStop`}
            label={t('ADD_ACTION')}
            description={t('PRESTOP_ACTION_DESC')}
            componentType="life"
            deleteNoObject={true}
          />
        </Form.Item>
      </Form.Group>
    )
  }
}
