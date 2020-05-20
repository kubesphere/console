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

import { getSuitableUnit, getValueByUnit } from 'utils/monitoring'

import { Icon, Checkbox } from '@pitrix/lego-ui'
import { Bar } from 'components/Base'
import styles from './index.scss'

export default class NodeItem extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    checked: false,
    onClick() {},
  }

  get node() {
    return get(this.props.data, 'node')
  }

  getMetricCfgs = (data = {}) => [
    {
      name: 'CPU',
      value: data.node_cpu_usage,
      total: data.node_cpu_total,
      utilisation: data.node_cpu_utilisation,
      unitType: 'cpu',
    },
    {
      name: 'Memory',
      value: data.node_memory_usage_wo_cache,
      total: data.node_memory_total,
      utilisation: data.node_memory_utilisation,
      unitType: 'memory',
    },
    {
      name: 'Pod',
      value: data.node_pod_running_count,
      total: data.node_pod_quota,
      utilisation: data.node_pod_utilisation,
    },
  ]

  handleClick = () => {
    this.props.onClick(this.node)
  }

  render() {
    const { data, checked } = this.props
    const nodeIp = get(data, 'node_ip', '-')
    const configs = this.getMetricCfgs(data)

    return (
      <div className={styles.item} onClick={this.handleClick}>
        <div className={styles.info}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="nodes" size={40} />
              <span className={classnames(styles.status, styles.active)} />
            </div>
            <div
              className={classnames(styles.checkbox, {
                [styles.checked]: checked,
              })}
            >
              <Checkbox checked={checked} />
            </div>
          </div>
          <div className={styles.desc}>
            <strong>{this.node}</strong>
            <p>{`${t('Node IP')}: ${nodeIp}`}</p>
          </div>
        </div>
        <div className={styles.monitoring}>
          {configs.map(({ name, value, total, utilisation, unitType }) => {
            const unit = getSuitableUnit([value, total], unitType)
            const _value = getValueByUnit(value, unit)
            const _total = getValueByUnit(total, unit)

            return (
              <div key={name} className={styles.metric}>
                <strong>{t(name)}</strong>
                <div className={styles.bar}>
                  <Bar value={Number(utilisation)} />
                  &nbsp;&nbsp;
                  <span>{`${_value}/${_total} ${unit}`}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
