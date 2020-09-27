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
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'

import { Icon, Tag, Tooltip } from '@kube-design/components'

import styles from './index.scss'

export default class ContainerItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    detail: PropTypes.object,
    podName: PropTypes.string,
  }

  static defaultProps = {
    prefix: '',
    detail: {},
  }

  renderProbe() {
    const { livenessProbe, readinessProbe, startupProbe } = this.props.detail

    if (!livenessProbe && !readinessProbe && !startupProbe) return null

    return (
      <div className={styles.probe}>
        {this.renderProbeRecord({
          probe: readinessProbe,
          title: t('Readiness Probe'),
          tagType: 'primary',
        })}
        {this.renderProbeRecord({
          probe: livenessProbe,
          title: t('Liveness Probe'),
          tagType: 'warning',
        })}
        {this.renderProbeRecord({
          probe: startupProbe,
          title: t('Startup Probe'),
          tagType: 'info',
        })}
      </div>
    )
  }

  renderProbeRecord({ probe, title, tagType }) {
    if (!probe) return null

    const delay = probe.initialDelaySeconds || 0
    const timeout = probe.timeoutSeconds || 0
    let probeType
    let probeDetail

    if ('httpGet' in probe) {
      const { path, port, scheme } = probe.httpGet
      probeType = 'HTTP Request Check'
      probeDetail = `GET ${path} on port ${port} (${scheme})`
    } else if ('tcpSocket' in probe) {
      probeType = 'TCP Port Check'
      probeDetail = `Open socket on port ${probe.tcpSocket.port} (TCP)`
    } else {
      const { command = [] } = probe.exec
      probeType = 'Exec Command Check'
      probeDetail = command.join(' ')
    }

    return (
      <div className={styles.probeItem}>
        <div>
          <Tag type={tagType}>{title}</Tag>
          <span className={styles.probeType}>{t(probeType)}</span>
          <span className={styles.probeTime}>
            {t('Initial Delay')}: {delay}s &nbsp;&nbsp;
            {t('Timeout')}: {timeout}s
          </span>
        </div>
        <p>{probeDetail}</p>
      </div>
    )
  }

  renderLimitRange() {
    const { detail } = this.props

    const limits = get(detail, 'resources.limits', {})
    const requests = get(detail, 'resources.requests', {})

    return (
      <div className={styles.limits}>
        {(limits.cpu || requests.cpu) && (
          <span className={styles.limit}>
            <Icon name="cpu" size={20} />
            <span>{`${requests.cpu || 0} ~ ${limits.cpu || '∞'}`}</span>
          </span>
        )}
        {(limits.memory || requests.memory) && (
          <span className={styles.limit}>
            <Icon name="memory" size={20} />
            {`${requests.memory || 0} ~ ${limits.memory || '∞'}`}
          </span>
        )}
      </div>
    )
  }

  render() {
    const { className, detail, prefix, podName, isInit, ...rest } = this.props
    const hasProbe = detail.livenessProbe || detail.readinessProbe

    return (
      <div className={classnames(styles.item, className)} {...rest}>
        <div className={styles.icon}>
          <Icon name="docker" size={40} />
        </div>
        <div className={classnames(styles.text, styles.name)}>
          <div>
            {detail.name}
            {isInit && (
              <Tag className="margin-l8" type="warning">
                {t('Init Container')}
              </Tag>
            )}
            {hasProbe && (
              <Tooltip content={this.renderProbe()}>
                <Tag className="margin-l8">{t('Probe')}</Tag>
              </Tooltip>
            )}
          </div>
          <p>
            {t('Image')}:{detail.image}
          </p>
        </div>
        {this.renderLimitRange()}
      </div>
    )
  }
}
