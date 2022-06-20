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
import classnames from 'classnames'
import { get } from 'lodash'
import { Icon } from '@kube-design/components'
import { Link } from 'react-router-dom'
import { getLocalTime } from 'utils'

import styles from './index.scss'

export default class Item extends React.Component {
  handleLinkClick = () => {
    localStorage.setItem('pod-detail-referrer', location.pathname)
  }

  render() {
    const { data } = this.props
    const { workspace, cluster, namespace } = this.props.match.params

    const status = data.podStatus

    const statusStr =
      status.type === 'running' || status.type === 'completed'
        ? 'running'
        : 'updating'

    return (
      <div className={styles.podItem}>
        <div className={styles.icon}>
          <Icon name="pod" size={32} />
          <span className={classnames(styles.status, styles[statusStr])} />
        </div>
        <div className={styles.text}>
          <Link
            to={`/${workspace}/clusters/${cluster}/projects/${namespace}/pods/${data.name}`}
          >
            <strong onClick={this.handleLinkClick}>{data.name}</strong>
          </Link>
          <p>
            {t('UPDATED_AT_VALUE_SCAP', {
              value: getLocalTime(
                get(data, 'status.startTime') || get(data, 'createTime')
              ).format(`YYYY-MM-DD HH:mm:ss`),
            })}
          </p>
        </div>
      </div>
    )
  }
}
