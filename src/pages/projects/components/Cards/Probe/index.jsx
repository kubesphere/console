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

import { Tag } from '@kube-design/components'
import { List, Panel } from 'components/Base'

import styles from './index.scss'

export default class ProbeCard extends React.Component {
  renderProbe() {
    const { livenessProbe, readinessProbe, startupProbe } = this.props.detail

    if (!livenessProbe && !readinessProbe && !startupProbe) return null

    return (
      <div className={styles.probe}>
        {this.renderProbeRecord({
          probe: readinessProbe,
          title: t('READINESS_PROBE'),
          tagType: 'primary',
        })}
        {this.renderProbeRecord({
          probe: livenessProbe,
          title: t('LIVENESS_PROBE'),
          tagType: 'warning',
        })}
        {this.renderProbeRecord({
          probe: startupProbe,
          title: t('STARTUP_PROBE'),
          tagType: 'info',
        })}
      </div>
    )
  }

  renderProbeRecord({ probe, title, tagType }) {
    if (!probe) return null

    const delay = probe.initialDelaySeconds || 0
    const timeout = probe.timeoutSeconds || 0
    let details = []
    let probeType

    if ('httpGet' in probe) {
      const { path, port, scheme } = probe.httpGet
      probeType = 'HTTP_REQUEST'
      details = [
        { title: scheme, description: t('REQUEST_TYPE') },
        { title: path, description: t('PATH') },
        { title: port, description: t('PORT') },
      ]
    } else if ('tcpSocket' in probe) {
      probeType = 'TCP_PORT'
      details = [{ title: probe.tcpSocket.port, description: t('PORT') }]
    } else {
      const { command = [] } = probe.exec
      probeType = 'COMMAND'
      details = [{ title: command.join(' '), description: t('COMMANDS') }]
    }

    const titleElm = (
      <>
        <Tag type={tagType}>{title}</Tag>
        <span className={styles.probeType}>{t(probeType)}</span>
      </>
    )

    const description = (
      <span>{t('INITIAL_DELAY_TIMEOUT_VALUE', { delay, timeout })}</span>
    )

    return (
      <List.Item
        icon="monitor"
        title={titleElm}
        description={description}
        details={details}
      />
    )
  }

  render() {
    return (
      <Panel title={t('HEALTH_CHECK')}>
        <div className={styles.wrapper}>{this.renderProbe()}</div>
      </Panel>
    )
  }
}
