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
          'Check the health of the container regularly according to the needs of the user.'
        )}
        checkable
      >
        <Form.Item
          className={styles.item}
          label={t('Container liveness check')}
        >
          <ProbeInput
            name={`${this.prefix}livenessProbe`}
            type={t('Container liveness check')}
            description={t('LIVENESS_PROBE_DESC')}
          />
        </Form.Item>
        <Form.Item className={styles.item} label={t('Container ready check')}>
          <ProbeInput
            name={`${this.prefix}readinessProbe`}
            type={t('Container ready check')}
            description={t('READINESS_PROBE_DESC')}
          />
        </Form.Item>
        <Form.Item className={styles.item} label={t('Container start check')}>
          <ProbeInput
            name={`${this.prefix}startupProbe`}
            type={t('Container start check')}
            description={t('STARTUP_PROBE_DESC')}
          />
        </Form.Item>
      </Form.Group>
    )
  }
}
