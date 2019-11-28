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

import { getDateDiff } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import { getWorkloadStatus } from 'utils/status'
import { getWorkloadReplicaCount } from 'utils/workload'

import { Icon, Checkbox } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class WorkloadItem extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    data: PropTypes.object,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    type: 'deployments',
    data: {},
    checked: false,
    onClick() {},
  }

  get workload() {
    return get(this.props.data, 'name')
  }

  handleClick = () => {
    this.props.onClick(this.workload, this.props.data)
  }

  render() {
    const { type, data, checked } = this.props
    const { name, createTime, app } = data || {}
    const count = getWorkloadReplicaCount(data, type)
    const { status: statusStr } = getWorkloadStatus(data, type)
    const statusVal = `${count.ready}/${count.total}`

    return (
      <div className={styles.item} onClick={this.handleClick}>
        <div className={styles.info}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name={ICON_TYPES[type]} size={40} />
              <span
                className={classnames(styles.status, {
                  [styles.active]: statusStr === 'Running',
                })}
              />
            </div>
            <div
              className={classnames(styles.checkbox, {
                [styles.checked]: checked,
              })}
            >
              <Checkbox checked={checked} onChange={this.handleClick} />
            </div>
          </div>
          <div className={styles.desc}>
            <strong>{name}</strong>
            <p>{`${t('Status')}: ${t(statusStr)}(${statusVal})`}</p>
          </div>
        </div>
        <div className={styles.metrics}>
          <div>
            <strong>{getDateDiff(createTime, true)}</strong>
            <p>{t('Running Time')}</p>
          </div>
          <div>
            <strong>{app || '-'}</strong>
            <p>{t('Application')}</p>
          </div>
        </div>
      </div>
    )
  }
}
