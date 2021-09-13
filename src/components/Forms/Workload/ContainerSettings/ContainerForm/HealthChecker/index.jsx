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
        label={t('HEALTH_CHECK')}
        desc={t('HEALTH_CHECKER_DESC')}
        checkable
      >
        <Form.Item
          className={styles.item}
          label={t('LIVENESS_CHECK')}
          desc={t('LIVENESS_CHECK_DESC')}
        >
          <ProbeInput
            name={`${this.prefix}livenessProbe`}
            probType="livenessProbe"
          />
        </Form.Item>
        <Form.Item
          className={styles.item}
          label={t('READINESS_CHECK')}
          desc={t('READINESS_CHECK_DESC')}
        >
          <ProbeInput
            name={`${this.prefix}readinessProbe`}
            probType="readinessProbe"
          />
        </Form.Item>
        <Form.Item
          className={styles.item}
          label={t('STARTUP_CHECK')}
          tip={t('STARTUP_CHECK_TIP')}
          desc={t('STARTUP_CHECK_DESC')}
        >
          <ProbeInput
            name={`${this.prefix}startupProbe`}
            probType="startupProbe"
          />
        </Form.Item>
      </Form.Group>
    )
  }
}
