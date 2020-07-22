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
import { Form } from 'components/Base'

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
        label={t('Health Checker')}
        desc={t(
          'The health of the container will be checked regularly according to user needs.'
        )}
        checkable
      >
        <Form.Item
          className={styles.item}
          label={t('Container Liveness Check')}
        >
          <ProbeInput
            name={`${this.prefix}livenessProbe`}
            type={t('Container Liveness Check')}
            description={t('LIVENESS_PROBE_DESC')}
            probType="livenessProbe"
          />
        </Form.Item>
        <Form.Item
          className={styles.item}
          label={t('Container Readiness Check')}
        >
          <ProbeInput
            name={`${this.prefix}readinessProbe`}
            type={t('Container Readiness Check')}
            description={t('READINESS_PROBE_DESC')}
            probType="readinessProbe"
          />
        </Form.Item>
        <Form.Item
          className={styles.item}
          label={t('Container Startup Check')}
          tip={t('STARTUP_PROBE_TIP')}
        >
          <ProbeInput
            name={`${this.prefix}startupProbe`}
            type={t('Container Startup Check')}
            description={t('STARTUP_PROBE_DESC')}
            probType="startupProbe"
          />
        </Form.Item>
      </Form.Group>
    )
  }
}
