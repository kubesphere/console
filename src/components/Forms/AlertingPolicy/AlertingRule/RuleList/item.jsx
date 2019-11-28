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
import { get } from 'lodash'

import { RESOURCE_METRICS_CONFIG } from 'configs/alerting/metrics'
import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'

import { Icon, Buttons } from '@pitrix/lego-ui'
import { Button } from 'components/Base'

import styles from './index.scss'

export default class RuleItem extends React.Component {
  static propTypes = {
    resourceType: PropTypes.string,
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
  }

  static defaultProps = {
    resourceType: '',
    data: {},
    onDelete() {},
    onEdit() {},
  }

  handleDelete = () => {
    const { rule_name } = this.props.data
    this.props.onDelete(rule_name)
  }

  handleEdit = () => {
    this.props.onEdit(this.props.data)
  }

  render() {
    const { resourceType, data = {} } = this.props
    const {
      _metricType,
      rule_name,
      consecutive_count,
      monitor_periods,
      condition_type,
      thresholds,
      unit,
      severity,
    } = data
    const metricConfig =
      get(RESOURCE_METRICS_CONFIG[resourceType], _metricType) || {}
    const consecutive = t('CONSECUTIVE_OPTIONS', { value: consecutive_count })
    const periods = t('PERIOD_OPTIONS', { value: monitor_periods })
    const condtion = `${condition_type} ${thresholds}${unit}`
    const severityOps = SEVERITY_LEVEL.find(op => op.type === severity) || {}

    return (
      <div className={styles.item}>
        <div className={styles.title}>
          <strong>{rule_name}</strong>
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
        <Buttons className={styles.buttons}>
          <Button type="flat" icon="trash" onClick={this.handleDelete} />
          <Button type="flat" icon="pen" onClick={this.handleEdit} />
        </Buttons>
      </div>
    )
  }
}
