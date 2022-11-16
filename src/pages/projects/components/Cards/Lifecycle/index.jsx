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

export default class LifecycleCard extends React.Component {
  renderProbe() {
    const { lifecycle } = this.props.detail

    if (!lifecycle) return null

    const { postStart, preStop } = lifecycle

    return (
      <div className={styles.probe}>
        {this.renderProbeRecord({
          probe: postStart,
          title: t('POSTSTART_ACTION'),
          tagType: 'primary',
        })}
        {this.renderProbeRecord({
          probe: preStop,
          title: t('PRESTOP_ACTION'),
          tagType: 'warning',
        })}
      </div>
    )
  }

  renderProbeRecord({ probe, title, tagType }) {
    if (!probe) return null

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

    return (
      <List.Item
        titleClass={styles.title}
        icon="monitor"
        title={titleElm}
        details={details}
      />
    )
  }

  render() {
    return (
      <Panel title={t('LIFECYCLE_MANAGEMENT')}>
        <div className={styles.wrapper}>{this.renderProbe()}</div>
      </Panel>
    )
  }
}
