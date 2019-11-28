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

import { ALL_METRICS_CONFIG } from 'configs/alerting/metrics'
import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'

import { Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class RuleItem extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    policyConfig: PropTypes.object,
  }

  static defaultProps = {
    data: {},
    policyConfig: {},
  }

  getSeverityMsg = ({
    repeat_type = '',
    repeat_interval_initvalue = 0,
  } = {}) => {
    let msg = ''

    switch (repeat_type) {
      default:
      case 'fixed-minutes':
        msg =
          repeat_interval_initvalue === 0
            ? t('SEVERITY_MSG_NO_LIMIT')
            : t('SEVERITY_MSG_FIXED_MINUTES', {
                count: repeat_interval_initvalue,
              })
        break
      case 'exp-minutes':
        msg = t('SEVERITY_MSG_EXP')
        break
      case 'not-repeat':
        msg = t('SEVERITY_MSG_NOT_REPEAT')
        break
    }

    return (
      <span>
        <Icon name="loudspeaker" size={16} />
        {msg}
      </span>
    )
  }

  getRuleStatus = () => {
    const { alertStatus } = this.props.data

    if (alertStatus === 'unknown') return null

    const isCleared = alertStatus === 'cleared'
    const msg = isCleared
      ? t('ALERT_RULE_STATUS_NO_OCCURRED')
      : t('ALERT_RULE_STATUS_OCCURRED')

    return (
      <span>
        <i
          className={classnames(styles.status, {
            [styles.health]: isCleared,
          })}
        />
        {msg}
      </span>
    )
  }

  render() {
    const { data = {}, policyConfig = {} } = this.props
    const {
      name,
      metricName,
      consecutive_count,
      monitor_periods,
      condition_type,
      thresholds,
      unit,
      severity,
    } = data
    const metricConfig = get(ALL_METRICS_CONFIG, metricName) || {}
    const consecutive = t('CONSECUTIVE_OPTIONS', { value: consecutive_count })
    const periods = t('PERIOD_OPTIONS', { value: monitor_periods })
    const condtion = `${condition_type} ${thresholds}${unit}`
    const severityOps = SEVERITY_LEVEL.find(op => op.type === severity) || {}
    const severityMsg = this.getSeverityMsg(policyConfig[severity])
    const ruleStatus = this.getRuleStatus()

    return (
      <div className={styles.item}>
        <div className={styles.title}>
          <strong>{name}</strong>
          <p>
            {ruleStatus}
            {severityMsg}
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <Icon name={metricConfig.prefixIcon || 'appcenter'} size={20} />
            {t(metricConfig.label || 'Unknown')}
          </div>
          <div className={styles.right}>
            <div className={styles.desc}>
              <span>{`${consecutive} (${periods})`} </span>
              <span>{condtion}</span>
            </div>
            <div className={styles.level}>
              <Icon name="information" size={16} color={severityOps.color} />
              {t(severityOps.label)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
