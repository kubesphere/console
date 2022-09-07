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
import { isEmpty, get } from 'lodash'

import { getLocalTime } from 'utils'
import { getAreaChartOps } from 'utils/monitoring'

import { Icon, Tooltip } from '@kube-design/components'
import { Indicator } from 'components/Base'
import { TinyArea } from 'components/Charts'
import ContainerItem from 'components/Cards/Containers/Item'
import StatusReason from 'projects/components/StatusReason'

import styles from './index.scss'

export default class PodItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    detail: PropTypes.object,
    metrics: PropTypes.object,
    loading: PropTypes.bool,
    isExpand: PropTypes.bool,
    onExpand: PropTypes.func,
  }

  static defaultProps = {
    prefix: '',
    detail: {},
    isExpand: false,
    onExpand() {},
  }

  get status() {
    const { status, type } = this.props.detail.podStatus
    return {
      type: type.toLowerCase(),
      name: status,
    }
  }

  get isCreating() {
    return (
      this.status.type === 'warning' && this.status.name === 'ContainerCreating'
    )
  }

  get isRunning() {
    return this.status.type === 'running' || this.status.type === 'completed'
  }

  get networkIPs() {
    const {
      detail: { networksStatus },
    } = this.props

    return networksStatus.reduce((prev, cur) => [...prev, ...cur.ips], [])
  }

  getContainerStatus = () => {
    const containerStatuses =
      get(this.props.detail, 'status.containerStatuses') || []

    let readyCount = 0

    containerStatuses.forEach(item => {
      if (item.ready) {
        readyCount += 1
      }
    })

    return {
      readyCount,
      total: containerStatuses.length,
    }
  }

  getUpdateStatus = () => {
    if (!this.isRunning) {
      const { name, type } = this.status
      return (
        <StatusReason
          status={type}
          reason={name}
          data={this.props.detail}
          type="pod"
        />
      )
    }

    return (
      <p>
        {t('CREATED_TIME', {
          diff: getLocalTime(this.props.detail.createTime).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
        })}
      </p>
    )
  }

  getLink = () => {
    const { detail } = this.props
    return `${this.props.prefix}/projects/${detail.namespace}/pods/${detail.name}`
  }

  getMonitoringCfgs = metrics => [
    {
      type: 'cpu',
      title: 'CPU',
      unitType: 'cpu',
      legend: ['USED'],
      data: [metrics.cpu],
      bgColor: 'transparent',
    },
    {
      type: 'memory',
      title: 'MEMORY',
      unitType: 'memory',
      legend: ['USED'],
      data: [metrics.memory],
      bgColor: 'transparent',
    },
  ]

  getNodeContent = () => {
    const { cluster, node, nodeIp } = this.props.detail
    const nodePermission = globals.app.hasPermission({
      cluster,
      module: 'nodes',
      action: 'view',
    })

    if (!node) return '-'

    const text = t('NODE_IP', { node, ip: nodeIp })

    return nodePermission ? (
      <Link to={`/clusters/${cluster}/nodes/${node}`}>{text}</Link>
    ) : (
      text
    )
  }

  handleExpandExtra = () => {
    const { detail, onExpand } = this.props
    onExpand(detail.uid)
  }

  handleLinkClick = () => {
    localStorage.setItem('pod-detail-referrer', location.pathname)
  }

  renderStatusTip() {
    const { name } = this.props.detail
    const { type: status, name: statusStr } = this.status
    const { readyCount, total } = this.getContainerStatus()

    return (
      <Tooltip
        content={
          <div className={styles.statusTip}>
            <strong>{name}</strong>
            <p>
              {t('READY')}: {readyCount}/{total}
            </p>
            <p>
              {t('STATUS')}: {t(statusStr)}
            </p>
          </div>
        }
      >
        <Indicator className={styles.indicator} type={status} flicker />
      </Tooltip>
    )
  }

  renderPodIPContent = data => (
    <div className={styles.ipTip}>
      <div>{t('POD_IP_ADDRESS')}</div>
      <ul>
        {data.map(item => (
          <li key={item}>
            <Icon name="ip" size={20} type="light" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  renderMonitorings() {
    const { metrics = {}, isExpand, loading } = this.props

    if (loading) return <div className={styles.monitors}>{t('LOADING')}</div>

    if (isEmpty(metrics.cpu) && isEmpty(metrics.memory))
      return <div className={styles.monitors}>{t('NO_MONITORING_DATA')}</div>

    const configs = this.getMonitoringCfgs(metrics)

    return (
      <div className={styles.monitors}>
        <div className={styles.charts}>
          {configs.map(item => {
            const config = getAreaChartOps(item)

            return (
              <TinyArea
                key={item.type}
                width="50%"
                height={40}
                {...config}
                darkMode={isExpand}
              />
            )
          })}
        </div>
      </div>
    )
  }

  renderContent() {
    const {
      detail: { name, podIp },
      isExpand,
    } = this.props

    return (
      <div className={styles.content}>
        <div className={styles.text}>
          <div>
            <span onClick={this.handleLinkClick}>{name}</span>
          </div>
          {this.getUpdateStatus()}
        </div>
        {!(location.pathname.indexOf('/nodes') !== -1) && (
          <div className={styles.text}>
            <div>{this.getNodeContent()}</div>
            <p>{t('NODE')}</p>
          </div>
        )}
        <div className={styles.text}>
          <div>
            <span>{podIp || '-'}</span>
            {!isEmpty(this.networkIPs) && this.networkIPs.length > 1 && (
              <Tooltip content={this.renderPodIPContent(this.networkIPs)}>
                <div className={styles.podip}>{this.networkIPs.length}</div>
              </Tooltip>
            )}
          </div>
          <p>{t('POD_IP_ADDRESS_SCAP')}</p>
        </div>
        {this.renderMonitorings()}
        <div className={styles.arrow}>
          <Icon name="chevron-down" type={isExpand ? 'light' : ''} size={20} />
        </div>
      </div>
    )
  }

  renderExtraContent() {
    const { prefix } = this.props
    const {
      cluster,
      containers = [],
      initContainers = [],
      name,
    } = this.props.detail

    if (isEmpty(containers)) return null
    const link =
      globals.app.hasPermission({ module: 'clusters', action: 'view' }) &&
      prefix
        ? this.getLink()
        : ''

    return (
      <div className={styles.itemExtra}>
        <div className="margin-b8">
          <strong>{t('CONTAINER_PL')}</strong>
        </div>
        <div className={styles.containers}>
          {containers.map(container => (
            <ContainerItem
              key={container.name}
              prefix={link}
              podName={name}
              detail={container}
              cluster={cluster}
              onContainerClick={this.handleLinkClick}
              isCreating={this.isCreating}
              hideterminal={true}
            />
          ))}
          {initContainers.map(container => (
            <ContainerItem
              key={container.name}
              prefix={link}
              podName={name}
              detail={container}
              cluster={cluster}
              onContainerClick={this.handleLinkClick}
              isCreating={this.isCreating}
              isInit
              hideterminal={true}
            />
          ))}
        </div>
      </div>
    )
  }

  render() {
    const { className, isExpand } = this.props

    return (
      <div
        className={classnames(styles.item, className, {
          [styles.expanded]: isExpand,
        })}
      >
        <div className={styles.itemMain} onClick={this.handleExpandExtra}>
          <div className={styles.icon}>
            <Icon name="pod" size={40} type={isExpand ? 'light' : 'dark'} />
            {this.renderStatusTip()}
          </div>
          {this.renderContent()}
        </div>
        {this.renderExtraContent()}
      </div>
    )
  }
}
