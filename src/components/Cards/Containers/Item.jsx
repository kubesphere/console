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
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isUndefined, isEmpty } from 'lodash'

import { Icon, Tooltip } from '@pitrix/lego-ui'
import { Indicator, Tag } from 'components/Base'
import { createCenterWindowOpt } from 'utils/dom'
import { getContainerStatus } from 'utils/status'
import ContainerLogModal from 'components/Modals/ContainerLog'

import styles from './index.scss'

export default class ContainerItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    detail: PropTypes.object,
    podName: PropTypes.string,
    isCreating: PropTypes.bool,
  }

  static defaultProps = {
    prefix: '',
    detail: {},
    isCreating: false,
  }

  state = {
    showContainerLog: false,
  }

  get canViewTerminal() {
    const { cluster } = this.props
    const { namespace } = this.props.detail
    return globals.app.hasPermission({
      module: 'pods',
      project: namespace,
      action: 'edit',
      cluster,
    })
  }

  getLink = name => `${this.props.prefix}/containers/${name}`

  handleOpenTerminal = () => {
    const { cluster, podName } = this.props
    const { namespace, name } = this.props.detail

    const terminalUrl = `/terminal/cluster/${cluster}/projects/${namespace}/pods/${podName}/containers/${name}`
    window.open(
      terminalUrl,
      `Connecting ${name}`,
      createCenterWindowOpt({
        width: 1200,
        height: 800,
        scrollbars: 1,
        resizable: 1,
      })
    )
  }

  showContainerLog = () => {
    this.setState({ showContainerLog: true })
  }

  hideContainerLog = () => {
    this.setState({ showContainerLog: false })
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

  render() {
    const {
      className,
      detail,
      isCreating,
      prefix,
      podName,
      cluster,
      isInit,
      onContainerClick,
      ...rest
    } = this.props
    const { showContainerLog } = this.state
    const link = this.getLink(detail.name)
    const { status, reason } = getContainerStatus(detail)
    const hasProbe = detail.livenessProbe || detail.readinessProbe

    return (
      <div className={classnames(styles.item, className)} {...rest}>
        <div className={styles.icon}>
          <Icon name="docker" size={40} />
          {!isUndefined(detail.ready) && (
            <Indicator className={styles.indicator} type={status} flicker />
          )}
        </div>
        <div className={classnames(styles.text, styles.name)}>
          <div>
            {prefix && status !== 'terminated' ? (
              <Link to={link}>
                <span onClick={onContainerClick}>{detail.name}</span>
              </Link>
            ) : (
              <span className={styles.noLink}>{detail.name}</span>
            )}
            {prefix && !isCreating && (
              <Tooltip content={t('Container Logs')}>
                <Icon
                  className="margin-l8"
                  name="log"
                  size={16}
                  clickable
                  onClick={this.showContainerLog}
                />
              </Tooltip>
            )}
            {status === 'running' && prefix && this.canViewTerminal && (
              <Tooltip content={t('Terminal')}>
                <Icon
                  className="margin-l8"
                  name="terminal"
                  size={16}
                  clickable
                  onClick={this.handleOpenTerminal}
                />
              </Tooltip>
            )}
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
          {reason ? (
            <p>{t(reason)}</p>
          ) : (
            <p>
              {t('Image')}:{detail.image}
            </p>
          )}
        </div>
        <div className={styles.text}>
          <div>{isUndefined(status) ? '-' : t(status)}</div>
          <p>{t('Status')}</p>
        </div>
        <div className={styles.text}>
          <div>
            {isUndefined(detail.restartCount) ? '-' : detail.restartCount}
          </div>
          <p>{t('Restart Count')}</p>
        </div>
        <div className={styles.text}>
          <div>
            {isEmpty(detail.ports)
              ? '-'
              : detail.ports
                  .map(port => `${port.containerPort}/${port.protocol}`)
                  .join(', ')}
          </div>
          <p>{t('Ports')}</p>
        </div>
        <ContainerLogModal
          visible={showContainerLog}
          podName={podName}
          container={detail}
          cluster={cluster}
          onCancel={this.hideContainerLog}
        />
      </div>
    )
  }
}
