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
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get, capitalize } from 'lodash'

import { ALL_METRICS_CONFIG } from 'configs/alerting/metrics'
import AlertPolicyStore from 'stores/alerting/policy'

import { Icon } from '@pitrix/lego-ui'
import { Card } from 'components/Base'

import styles from './index.scss'

class AlertPolicy extends React.Component {
  constructor(props) {
    super(props)

    this.policyStore =
      props.policyStore || new AlertPolicyStore(this.resourceType)
  }

  get module() {
    return this.props.module
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get params() {
    return this.props.match.params
  }

  get store() {
    return this.props.detailStore
  }

  @computed
  get resourceType() {
    return this.store.detail.resourceType
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = params => {
    const data = {
      name: this.store.detail.alertName,
      limit: Infinity,
      ...this.params,
      ...params,
    }
    this.policyStore.fetchRules(data)
  }

  render() {
    const { workloadKind } = this.store.detail
    const { data, isLoading } = this.policyStore.rules
    const resourceText = workloadKind
      ? t(workloadKind)
      : t(capitalize(this.resourceType))
    const title = t('ALERT_POLICY_TYPE', {
      type: resourceText,
    })
    const desc = t('ALERT_POLICY_TRIGGER_RULE')

    return (
      <Card title={t('Alerting Policy')} loading={isLoading}>
        <div className={styles.main}>
          <div className={styles.info}>
            <Icon className={styles.icon} name="hammer" size={32} />
            <div className={styles.desc}>
              <strong>{title}</strong>
              <p>{desc}</p>
            </div>
          </div>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>{t('ALERT_METRIC_NAME')}</th>
                  <th>{t('Period')}</th>
                  <th>{t('Consecutive Count')}</th>
                  <th>{t('Condition')}</th>
                  <th>{t('Threshold')}</th>
                </tr>
              </thead>
              <tbody>
                {data.map(rule => {
                  const {
                    metricName = '',
                    monitor_periods = 0,
                    consecutive_count = 0,
                    condition_type = '>',
                    thresholds = 0,
                    unit = '',
                  } = rule || {}
                  const metricLabel = t(
                    get(ALL_METRICS_CONFIG, `[${metricName}].label`, '')
                  )
                  const periods = t('PERIOD_OPTIONS', {
                    value: monitor_periods,
                  })
                  const consecutive = t('CONSECUTIVE_OPTIONS', {
                    value: consecutive_count,
                  })

                  return (
                    <tr key={rule.rule_id}>
                      <td>{metricLabel}</td>
                      <td>{periods}</td>
                      <td>{consecutive}</td>
                      <td>{condition_type}</td>
                      <td>{`${thresholds}${unit}`}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    )
  }
}

export default inject('rootStore', 'detailStore')(observer(AlertPolicy))
export const Component = AlertPolicy
