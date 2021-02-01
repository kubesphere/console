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

import { get } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class Card extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
    health: PropTypes.object,
    edge: PropTypes.object,
  }

  static defaultProps = {
    data: {},
    health: {},
    edge: {},
  }

  renderHTTPMetrics() {
    const { health, edge } = this.props

    const errorRatio = get(health, 'requests.errorRatio')
    const request_count = get(edge, 'data.traffic.rates.http', 0)
    const request_success_rate =
      errorRatio === -1 ? NaN : (100 - errorRatio).toFixed(2)
    const request_duration = get(edge, 'data.responseTime', NaN)

    return (
      <div className={styles.detail}>
        <p>
          <Icon name="changing-over" size={16} /> {`${request_count} RPS`}
        </p>
        <p>
          <Icon name="check" size={16} />{' '}
          {!isNaN(request_success_rate)
            ? `${request_success_rate}%`
            : t('No Data')}
        </p>
        <p>
          <Icon name="timed-task" size={16} />{' '}
          {!isNaN(request_duration) && request_duration !== '0'
            ? `${request_duration} ms`
            : t('No Data')}
        </p>
        <p>
          <Icon name="pod" size={16} />{' '}
          {get(health, 'workloadStatus.available') ||
            get(health, 'workloadStatus.availableReplicas')}{' '}
          /{' '}
          {get(health, 'workloadStatus.replicas') ||
            get(health, 'workloadStatus.desiredReplicas')}
        </p>
      </div>
    )
  }

  renderTCPMetrics() {
    const { data, health } = this.props

    const requestIn = get(data, 'traffic[0].rates.tcpIn')
    const requestOut = get(data, 'traffic[0].rates.tcpOut')

    return (
      <div className={styles.detail}>
        <p>
          <Icon name="next" size={16} />{' '}
          {!isNaN(requestIn) ? `${requestIn} B/s` : t('No Data')}
        </p>
        <p>
          <Icon name="previous" size={16} />{' '}
          {!isNaN(requestOut) ? `${requestOut} B/s` : t('No Data')}
        </p>
        <p>
          <Icon name="pod" size={16} />{' '}
          {get(health, 'workloadStatus.availableReplicas')} /{' '}
          {get(health, 'workloadStatus.desiredReplicas')}
        </p>
      </div>
    )
  }

  renderDetail() {
    const { edge } = this.props

    const protocol = get(edge, 'data.traffic.protocol') || 'http'

    if (protocol === 'http') {
      return this.renderHTTPMetrics()
    }

    return this.renderTCPMetrics()
  }

  render() {
    const { data, health, className, inGroup } = this.props

    const isGateway =
      data.app.indexOf('kubesphere') !== -1 || data.app === 'unknown'

    if (isGateway) {
      return (
        <div
          className={classNames(styles.card, className)}
          data-workload={data.workload}
          data-workload-id={data.id}
          data-group={inGroup}
        >
          <div className={styles.type}>{t('Traffic Entry')}</div>
          <div className={styles.wrapper}>
            <div className={styles.gatewayName}>
              <Icon name="project" size={16} />
              {data.targetNamespace}
            </div>
          </div>
        </div>
      )
    }

    const errorRatio = get(health, 'requests.errorRatio')

    return (
      <div
        className={classNames(styles.card, className, {
          [styles.error]: errorRatio > 0,
        })}
        data-workload={data.workload}
        data-workload-id={data.id}
        data-group={inGroup}
      >
        <div className={styles.type}>
          {data.hasCB && <Icon name="thunder" type="light" />}
          {t('Deployment')}
        </div>
        <div className={styles.wrapper}>
          {this.renderDetail()}
          <div className={styles.workload}>
            <span>{t('Deployment')}</span> {data.workload}
          </div>
        </div>
      </div>
    )
  }
}
