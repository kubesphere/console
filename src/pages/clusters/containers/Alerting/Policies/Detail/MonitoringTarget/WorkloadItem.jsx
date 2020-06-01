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

import { getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import { getWorkloadStatus } from 'utils/status'
import { getWorkloadReplicaCount } from 'utils/workload'

import { Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class WorkloadItem extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.object,
  }

  static defaultProps = {
    prefix: '',
    type: '',
    data: {},
  }

  get status() {
    const { type, data } = this.props
    return getWorkloadStatus(data, type)
  }

  get count() {
    const { type, data } = this.props
    return getWorkloadReplicaCount(data, type)
  }

  render() {
    const { prefix, type, data } = this.props
    const { name, createTime, app } = data
    const { status: statusStr } = this.status
    const statusVal = `${this.count.ready}/${this.count.total}`

    return (
      <div className={styles.item}>
        <div className={styles.icon}>
          <Icon name={ICON_TYPES[type]} size={40} />
          <span
            className={classnames(styles.status, {
              [styles.active]: statusStr === 'Running',
            })}
          />
        </div>
        <div className={styles.basic}>
          <strong>
            <Link to={`${prefix}/${name}`}>{name}</Link>
          </strong>
          <p>{`${t('Status')}: ${t(statusStr)}(${statusVal})`}</p>
        </div>
        <div className={styles.desc}>
          <div>
            <strong>{getLocalTime(createTime).fromNow()}</strong>
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
